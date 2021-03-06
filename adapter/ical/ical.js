/**
 *      CCU.IO iCal Adapter
 *      12'2013 vader722
 *
 *      Version 1.1
 *
 *      + checking predefined Events and set variable when desired
 *      + hiding Event when desired
 */

var settings = require(__dirname+'/../../settings.js');

if (!settings.adapters.ical || !settings.adapters.ical.enabled) {
    process.exit();
}

var icalSettings = settings.adapters.ical.settings;

var logger = require(__dirname+'/../../logger.js'),
    io     = require('socket.io-client');

var objects = {},
	datapoints = {};
var ical = require('ical'), months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
var RRule = require('rrule').RRule;
var S = require('string');
var preview = icalSettings.preview;
var intervalID;
var fontbold = '<span style=\"font-weight:bold;color:'+icalSettings.defColor+'\">';
var fontnormal = '<span style=\"font-weight:normal;color:'+icalSettings.defColor+'\">';
var fontboldorange = '<span style="font-weight:bold;color:orange">';
var fontnormalorange = '<span style="font-weight:normal;color:orange">';
var fontboldred = '<span style="font-weight:bold;color:red">';
var fontnormalred = '<span style="font-weight:normal;color:red">';

var fullTime = icalSettings.fulltime;
var colorize = icalSettings.colorize;
var replaceDates = icalSettings.replaceDates;
var todayString = icalSettings.todayString;
var tomorrowString = icalSettings.tomorrowString;
var arrDates = Array();

var warn = fontboldred+"<span class='icalWarn'>";
var warn2 ="</span></span>" + fontnormalred+"<span class='icalWarn2'>";
var prewarn = fontboldorange+"<span class='icalPreWarn'>";
var prewarn2 = "</span></span>" + fontnormalorange+"<span class='icalPreWarn2'>";
var normal = fontbold+"<span class='icalNormal'>";
var normal2 = "</span></span>" + fontnormal+"<span class='icalNormal2'>";

var debug = icalSettings.debug;
var everyCalOneColor = icalSettings.everyCalOneColor;

var prefix;
var suffix;

var calCol;
var runningParser = new Array();
var eventsDP = new Array();
var processedEvents = new Array();


//Start bei firstID + 10
var dpId = icalSettings.firstId + 10;


if (settings.ioListenPort) {
	var socket = io.connect("127.0.0.1", {
		port: settings.ioListenPort
	});
} else if (settings.ioListenPortSsl) {
	var socket = io.connect("127.0.0.1", {
		port: settings.ioListenPortSsl,
		secure: true
	});
} else {
	process.exit();
}

socket.on('connect', function () {
    logger.info("adapter ical  connected to ccu.io");
});

socket.on('disconnect', function () {
    logger.info("adapter ical  disconnected from ccu.io");
});

socket.on('event', function (obj) {
    if (!obj || !obj[0]) {
        return;
    }
        
    var id = obj[0];
    var val = obj[1];
    var ts = obj[2];
    var ack = obj[3];
        if (obj[0] == icalSettings.firstId) {
          //  logger.info("Event:"+id + " l"+val+"l");
                if (id == icalSettings.firstId && val != "" && val !="autorun" && val != "stopped") {
					var content = val.split(" ");
					setState(icalSettings.firstId + 1, "");
                    setState(icalSettings.firstId + 2, "0");
                    //von defURL lesen
					if (content[0] == "read") {
						logger.info("adapter ical  reading iCal from default URL: " + icalSettings.defURL);
						readOne(icalSettings.defURL);
					}
                    // autoload starten
                    if (content[0] == "start") {
                        //eventuell alte Instanz stoppen
                        clearInterval(intervalID);
                        logger.info("adapter ical  startting autoload every " + icalSettings.runEveryMinutes);
						intervallID = setInterval(readAll,icalSettings.runEveryMinutes * 60000);
                        setState(icalSettings.firstId, "autorun");
                    }
                    //autoload stoppen
                    if (content[0] == "stop") {
                        logger.info("adapter ical  stopping autoload");
                        clearInterval(intervalID);
                        setState(icalSettings.firstId, "stopped");
                    }
					//von custom URL lesen
					if (content[0] == "readURL") {
						if (content[1] != "") {
							logger.info("adapter ical  reading iCal from URL: " + content[1]);
							readOne(content[1]);
						}
					}
                    //Test
                    if (content[0] == "check") {
                        if (content[1] != "") {
                            logger.info("adapter ical  checking: " + content[1]);
                            checkForEvents(content[1]);
                        }
                    }
                    if (content[0] == "readAll") {
                        if (content[1] != "") {
                            logger.info("adapter ical  readAll ");
                            readAll();
                        }
                    }
				}
		}
});

/* Compare the current date against another date.
 *
 * @param b  {Date} the other date
 * @returns   -1 : if this < b
 *             0 : if this === b
 *             1 : if this > b
 *            NaN : if a or b is an illegal date
 */
Date.prototype.compare = function(b) {
    if (b.constructor !== Date) {
        throw "invalid_date";
    }

    return (isFinite(this.valueOf()) && isFinite(b.valueOf()) ?
        (this>b)-(this<b) : NaN
        );
};

function checkiCal(loc,col,count,cb) {

    //Benötigt eine angepasste Version von node-ical, damit die übergebenden Opts auch wieder zurückkommen
    // Syntax ical.fromURL(URL,opts,callback) returns err,opts,data
        ical.fromURL(loc, col, function (err, opts, data) {
			if (err != undefined) {
				logger.info("adapter ical  Error Reading from URL: " + err.toString());
			}
           logger.info("adapter ical  processing URL: " + opts+ " "+ loc);
            //Variable ablöschen
            setState(icalSettings.firstId + 1, "");
            setState(icalSettings.firstId + 2, "0");
         /* for (var k in data) {
             if (data.hasOwnProperty(k)) {
             var value = data[k];
             console.log("property name is " + k + " value is " + value);
             for (var l in value) {
             if (value.hasOwnProperty(l)) {
             var val = value[l];
             console.log("property name2 is " + k + " " + l + " value is " + val);
             }
             }
             }
             }*/

            for (var k in data) {
                if (data.hasOwnProperty(k)) {
                    var ev = data[k];
                    var endpreview = new Date();
					var realnow = new Date();
                    var heute = new Date();

					endpreview.setDate(endpreview.getDate() + preview);
                    heute.setHours(0,0,0,0);
					//Now2 1 Sekunde  zurück für Vergleich von ganztägigen Terminen in RRule
					var now2 = new Date();
					//Uhzeit nullen
					now2.setHours(0,0,0,0);
					//Datum 1 Sec zurück wegen Ganztätigen Terminen um 00:00 Uhr
					now2.setSeconds(now2.getSeconds() - 1);
                    tomorrow = new Date();
                    tomorrow.setDate(heute.getDate() + 1);
                    tomorrow.setHours(0,0,0,0);
                    tomorrow2 = new Date();

                    //es interessieren nur Termine mit einer Summary und nur Einträge vom Typ VEVENT
                    if ((ev.summary != undefined) && (ev.type == "VEVENT") ) {
                    //aha, eine RRULE in dem Termin --> auswerten
                        if (ev.rrule != undefined) {
                            var options = RRule.parseString(ev.rrule.toString());
                            options.dtstart = ev.start
                            rule = new RRule(options)
                            if (debug) {logger.info("adapter ical  RRule termin:" + ev.summary + " " + ev.start.toString() + " " + endpreview.toString() + " now:" + heute + " now2:" + now2 +  " " +rule.toText());}
                            var dates = rule.between(now2, endpreview);
                            //Termine innerhalb des Zeitfensters
                            if (dates.length > 0) {
                                for (var i = 0; i < dates.length; i++) {
                                    //Datum ersetzen für jeden einzelnen Termin in RRule
                                    //TODO: funktioniert nur mit Terminen innerhalb eines Tages, da auch das EndDate ersetzt wird
                                    ev.start.setDate(dates[i].getDate());
                                    ev.start.setMonth(dates[i].getMonth());
                                    ev.start.setFullYear(dates[i].getFullYear());
                                    ev.end.setDate(dates[i].getDate());
                                    ev.end.setMonth(dates[i].getMonth());
                                    ev.end.setFullYear(dates[i].getFullYear());
                                    //Termin auswerten
                                    if (ev.exdate) {
                                        //Wenn es exdate
                                        if (ev.exdate != heute) {
                                            checkDates(ev,endpreview,heute,tomorrow,realnow," rrule ",col);
                                        }
                                    } else {
                                        checkDates(ev,endpreview,heute,tomorrow,realnow," rrule ",col);
                                    }

                                }
                            } else {
                                if (debug) {logger.info("adapter ical  Keine RRule Termine innerhalb des Zeitfensters");}
                            }
                        } else {
                            //Kein RRule Termin
                            checkDates(ev,endpreview,heute,tomorrow,realnow," ",col);

                        }
                    }
                }
            }
            //wir sind fertig callback aufrufen
            cb(count);
        });
}

function checkDates(ev,endpreview,heute,tomorrow,realnow,rule,col) {
    var ft = false;
    var betreff;

    //Check ob ganztägig
// Für Outlook schauen ob ev.summary eventuell Unterparameter enthält
    if (ev.summary.hasOwnProperty("val")) {
        //Ja, also Betreff auslesen
        betreff = ev.summary["val"];
    } else {
        //Nein
        betreff = ev.summary;
    }
    //Wenn es kein Starttermin gibt --> ignorieren
    if (ev.start == undefined) {return}

    if(ev.start.getHours() == "0" && ev.start.getMinutes() == "0" && ev.start.getSeconds() == "0" && ev.end.getHours() == "0" && ev.end.getMinutes() == "0" && ev.end.getSeconds() == "0" ) {
        ft = true;
    }
    //Wenn ganztätig
    if (ft) {
        //Terminstart >= heute  && < previewzeit  oder endzeitpunkt > heute && < previewzeit ---> anzeigen
        if ((ev.start < endpreview && ev.start >= heute) || (ev.end > heute && ev.end <= endpreview)) {
            var MyTimeString = ('0' + ev.start.getHours()).slice(-2) + ':' + ('0' + (ev.start.getMinutes())).slice(-2);
            colorizeDates(ev,heute,tomorrow,col);
            //Nur ganztägige Termine werden gefprüft
            var display = checkForEvents(betreff,heute,ev,true,realnow);
            var singleDate = prefix + ev.start.getDate() + "." + (ev.start.getMonth() + 1) + "." + ev.start.getFullYear() + " " + MyTimeString + suffix + " " + betreff;
            //Nur hinzufügen wenn gewünscht
            if (display) {
                arrDates.push(singleDate);
                if (debug) {logger.info("adapter ical  Termin (ganztägig) hinzugefügt : " +rule + betreff + " am " + singleDate);}
            } else {
                if (debug) {logger.info("adapter ical  Termin (ganztägig) nicht dargestellt, da in Events nicht gewünscht :" +betreff)}
            }
        } else {
            //Termin ausserhalb des Zeitfensters
            if (debug) {logger.info("adapter ical  Termin (ganztägig)" + rule +  betreff + " am " + ev.start + " aussortiert, da nicht innerhalb des Zeitfensters");}
        }
    } else {
        //Termin mit Uhrzeit
        //Startzeitpunk >= heute && Startzeitpunkt < previewzeit && EndZeitpunkt >= jetzt
        if ((ev.start >= heute && ev.start < endpreview && ev.end >= realnow) || (ev.end >= realnow && ev.end <= endpreview) ) {
          //  logger.info("Termin mit Uhrzeit: " +rule + ev.start + " end: " + ev.end + " realnow:" +realnow);
            var MyTimeString = ('0' + ev.start.getHours()).slice(-2) + ':' + ('0' + (ev.start.getMinutes())).slice(-2);
            var display = checkForEvents(betreff,heute,ev,false,realnow);
            colorizeDates(ev,heute,tomorrow,col);
            var singleDate = prefix + ev.start.getDate() + "." + (ev.start.getMonth() + 1) + "." + ev.start.getFullYear() + " " + MyTimeString + suffix + " " + betreff;
            //Nur hinzufügen wenn gewünscht
            if (display) {
                arrDates.push(singleDate);
                if (debug) {logger.info("adapter ical  Termin mit Uhrzeit hinzugefügt : "+rule + betreff + " am " + singleDate);}
            } else {
                if (debug) {logger.info("adapter ical  Termin nicht dargestellt, da in Events nicht gewünscht :" +betreff)}
            }
        } else {
            //Termin ausserhalb des Zeitfensters
            if (debug) {logger.info("adapter ical  Termin " + betreff + rule +" am " + ev.start + " aussortiert, da nicht innerhalb des Zeitfensters");}
        }
    }
}
function colorizeDates(ev,heute,tomorrow,col) {
    var com = ev.start;
    com.setHours(0,0,0,0);

    //Colorieren wenn gewünscht
    if (colorize) {
        //Heute
        if (com.compare(heute) == 0) {
            prefix = warn;
            suffix = warn2;
        }
        //Morgen
        if (com.compare(tomorrow) == 0) {
            prefix = prewarn;
            suffix = prewarn2;
        }
        //Ansonsten
        if (com.compare(tomorrow) == 1) {
            prefix = normal;
            suffix = normal2;
        }
        //Starttermin in der Vergangenheit
        if (com.compare(heute) == -1) {
            prefix = normal;
            suffix = normal2;
        }
    } else {
        //Wenn gewünscht jeder Kalender eigene Farbe
        if (everyCalOneColor) {
         console.log("Farbe:"+col);
          prefix = '<span style=\"font-weight:bold;color:' + col + '\">'+"<span class='icalNormal'>";
          suffix = "</span></span>" + '<span style=\"font-weight:normal;color:' + col + '\">'+"<span class='icalNormal2'>";
         } else {
            prefix = normal;
            suffix = normal2;
        }
    }
}

function checkForEvents(betreff,heute,ev,ft,realnow) {
    var id;
    //unbekannte Events darstellen
    var rv = true;

    // Schauen ob es ein Event in der Tabelle gibt
    for (var counter in eventsDP) {
        if (betreff.search(new RegExp(eventsDP[counter]["Event"], 'g')) > -1) {
            id = eventsDP[counter]["ID"];
            //auslesen ob das Event angezeigt werden soll
            rv = eventsDP[counter]["display"];
            if (debug) {logger.info("adapter ical  found Event in Table: " + eventsDP[counter]["Event"] + " " + id);}


            if (ft) {
                //Ganztägige Termine
                //Nur weitermachen wenn der Termin heute ist
                if ((ev.start <= heute) && (ev.end >= heute)) {
                    //merken welche Events wir bearbeitet haben
                    processedEvents.push(betreff);
                    //Wenn schon bearbeitet
                    if (eventsDP[counter]["processed"]) {
                        //nix tun
                        if (debug) {
                            logger.info("adapter ical  Event schon bearbeitet");
                        }
                    } else {
                        //Ansonsten bearbeiten
                        eventsDP[counter]["processed"] = true;
                        eventsDP[counter]["state"] = true;
                        logger.info("adapter ical  Setze ID: " + id + " auf true");
                        setState(id, true);
                    }
                }
            } else {
                //Termine mit Uhrzeit
                //Nur weitermachen wenn der Termin aktuell gültig ist
                console.log("Termin mit Uhrzeit:" + ev.start + " " + realnow + " " + ev.end);
                if ((ev.start <= realnow) && (ev.end >= realnow)) {
                    //if ((ev.start >= heute && ev.start < endpreview && ev.end >= realnow) || (ev.end >= realnow && ev.end <= endpreview) ) {
                    //merken welche Events wir bearbeitet haben
                    processedEvents.push(betreff);
                    //Wenn schon bearbeitet
                    if (eventsDP[counter]["processed"]) {
                        //nix tun
                        if (debug) {
                            logger.info("adapter ical  Event schon bearbeitet");
                        }
                    } else {
                        //Ansonsten bearbeiten
                        eventsDP[counter]["processed"] = true;
                        eventsDP[counter]["state"] = true;
                        logger.info("adapter ical  Setze ID: " + id + " auf true");
                        setState(id, true);
                    }
                }
            }
        }
    }
    return rv;
}

function pastprocessEvents() {
    // Tabelle durchgehen
    var found = false;
    for (var counter in eventsDP) {
        if (eventsDP[counter]["processed"]) {
            //Dieses Element wurde bearbeitet --> nun schauen ob es auch in diesem Durchlauf noch vorhanden war
            for (var i in processedEvents) {
                if (processedEvents[i].search(new RegExp(eventsDP[counter]["Event"], 'g')) > -1) {
                //if (processedEvents[i] == eventsDP[counter]["Event"]) {
                    found = true;
                }
            }
            if (found) {
                //Alles gut, Element noch da
            } else {
                //Nein, also Event vorbei --> Variable auf false
                eventsDP[counter]["processed"] = false;
                eventsDP[counter]["state"] = false;
                var id = eventsDP[counter]["ID"];
                logger.info("adapter ical  Setze ID: " + id + " auf false");
                setState(id,false);
            }
       }
    }
    //Abgearbeitet --> Array löschen
    processedEvents.length = 0;
}

function createEventsDP() {
    var id;
    var found = false;
    var eintrag;

    //In den Settings schauen ob es ein Event gibt
    for (var ev in icalSettings["Events"]) {
        //Anlegen in CCU.IO
        setObject(dpId , {
            Name: ev,
            TypeName: "VARDP"
        });
        //console.log("yo:" + icalSettings["Events"][ev]["enabled"]);
        if(icalSettings["Events"][ev]["enabled"]) {
            //Anlegen in interner Liste
            var evDP = new Object();
            evDP["Event"] = ev;
            evDP["ID"] = dpId;
            evDP["processed"] = false;
            evDP["state"] = false;
            evDP["display"] = icalSettings["Events"][ev]["display"];
            eventsDP.push(evDP);
            //Beim start alle ablöschen
            setState(dpId,false);
        }
        dpId += 1;
    }
}

//Alle Kalender einlesen
function readAll() {
	arrDates = new Array();
	var count = 0;
	
	//neue Notation
	if (icalSettings["Calendar"]) {
        //eigene Instanz hinzufügen, falls die Kalender schnell abgearbeitet werden
        runningParser.push(0);
		for (var cal in icalSettings["Calendar"]) {
			if ((icalSettings["Calendar"][cal]["calURL"] != "") && (icalSettings["Calendar"][cal]["calURL"] != undefined)) {
				count +=1;
			 	if (debug) {logger.info("adapter ical  reading Calendar from URL: " + icalSettings["Calendar"][cal] + " color: " +icalSettings["Calendar"][cal]["calColor"] );}
                calCol = icalSettings["Calendar"][cal]["calColor"];
                //merker für Kalender hinzufügen
                runningParser.push(count);
                checkiCal(icalSettings["Calendar"][cal]["calURL"],calCol,count, function (count) {
                    //diese Instanz aus Liste löschen
                    runningParser.pop();
                    //Wenn diese Instanz die letzte ist, dann darstellen
                    if (runningParser.length == 0) {
                        if (debug) {logger.info("adapter ical  displaying dates because of callback");}
                        displayDates();
                    }
                });
			}
		}
        //unsere Instanz löschen
        runningParser.pop();
        //Wenn es die letzte Instanz war, dann darstellen
        if (runningParser.length == 0) {
            if (debug) {logger.info("adapter ical  displaying dates");}
            displayDates();
        }
	}
}

//Einen Kalender einlesen

function readOne(url) {
	arrDates = new Array();
	checkiCal(url,icalSettings.defColor,1,function (count) {
        //Returnwert egal, da nur ein Kalender
        //Auswertung fertig --> Darstellen
        displayDates();
    });

}

//Darstellen nachdem alle eingelesen wurden
function displayDates() {

    var tomorrowd = new Date();
    tomorrowd.setDate(tomorrowd.getDate() + 1);
    var todayd = new Date();
    var tomorrow = tomorrowd.getDate()+"."+(tomorrowd.getMonth()+1)+"."+tomorrowd.getFullYear();
    var today = todayd.getDate()+"."+(todayd.getMonth()+1)+"."+todayd.getFullYear();

    if (arrDates.length > 0) {
        setState(icalSettings.firstId + 1, brSeparatedList(arrDates,today,tomorrow));
        //Erweiterung von nicx
        var todayEventcounter = S(brSeparatedList(arrDates,today,tomorrow)).count(todayString);
        setState(icalSettings.firstId + 2, todayEventcounter);
    }
    //Am Ende schauen ob Events vorbei sind
    pastprocessEvents();
}

function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    // note parts[1]-1
    return new Date(parts[2], parts[1]-1, parts[0]);
}

//Sortierfunktion für arr.sort
function SortDates(a,b) {
    //Datum aus dem HTML extrahieren
    var firstindex = a.indexOf("'>");
    var lastindex = a.indexOf("</span");
    var a1 = a.substr(firstindex+2,(lastindex-firstindex)-2);
    var da1 = a1.split(' ')[0];
    var ti1 = a1.split(' ')[1];
    var d = da1 ;
    //in Date wandeln
    var date1 = parseDate(d);
    date1.setHours(ti1.split(":")[0]);
    date1.setMinutes(ti1.split(":")[1])

    firstindex = b.indexOf("'>");
    lastindex = b.indexOf("</span");
    b1 = b.substr(firstindex+2,(lastindex-firstindex)-2);
    var da2 = b1.split(' ')[0];
    var ti2 = b1.split(' ')[1];
    var d2 = da2;
    var date2 = parseDate(d2);
    date2.setHours(ti2.split(":")[0]);
    date2.setMinutes(ti2.split(":")[1])
    //vergleichen
    return date1.compare(date2);
}

function brSeparatedList(arr,today,tomorrow) {
    var text = "";
    //Sortieren nach eigener Methode
    arr.sort(SortDates);
    var length = arr.length;
    if (length > 0) {
        var first = true;
        for (var i=0; i<length; i++) {
            if (!first) {
               text = text + "<br/>";
            } else {
                first = false;
            }
            text = text + arr[i] + "</span></span>";
        }
    }
	//Wenn fullTime gesetzt, dann 00:00 ersetzen durch String
    if (fullTime != "") {
	   text = text.replace(/00:00/g, fullTime);
    }
    //Wenn replaceDates gesetzt, dann ersetze Datum durch String
    if (replaceDates != "") {
        text = text.replace( new RegExp( today, 'g' ), todayString );
        text = text.replace( new RegExp( tomorrow, 'g' ), tomorrowString );
    }
    return text;
}

function stop() {
    logger.info("adapter ical  terminating");
	setTimeout(function () {
        process.exit();
    }, 250);
}

process.on('SIGINT', function () {
    stop();
});

process.on('SIGTERM', function () {
    stop();
});

function setObject(id, obj) {
    objects[id] = obj;
    if (obj.Value) {
        datapoints[obj.Name] = [obj.Value];
    }
    socket.emit("setObject", id, obj);
}

function setState(id, val) {
	datapoints[id] = [val];
	logger.verbose("adapter ical  setState "+id+" "+val);
	socket.emit("setState", [id,val,null,true]);
}

function iCalInit() {
    
	setObject(icalSettings.firstId, {
        Name: "iCalReadTrigger",
        TypeName: "VARDP",
    });
	
	setObject(icalSettings.firstId + 1 , {
        Name: "iCalEvents",
        TypeName: "VARDP",
    });
    setObject(icalSettings.firstId + 2 , {
        Name: "iCalEventCount",
        TypeName: "VARDP",
    });
	
	setState(icalSettings.firstId, "");
	setState(icalSettings.firstId + 1, "");

    createEventsDP();
	
	  logger.info("adapter ical  objects inserted, starting at: "+icalSettings.firstId);

    if (icalSettings.runEveryMinutes > 0) {
        //Autostart --> first read in 4sec
	    setTimeout(readAll,4000);
        //now schedule
        var runeveryminutes = icalSettings.runEveryMinutes * 60000;
        logger.info("adapter ical  autorun every " + icalSettings.runEveryMinutes + " Minutes");
        setState(icalSettings.firstId, "autorun");
        //intervalID = setInterval(function() {checkiCal(icalSettings.defURL)},runeveryminutes);
        intervallID = setInterval(readAll,runeveryminutes);
	}
}

logger.info("adapter ical  start");

iCalInit();

