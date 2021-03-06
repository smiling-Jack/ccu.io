// Translated words
var ccuWords = {
    "YES"               : {"en": "YES",                  "de": "JA",                  "ru": "ДА"},
    "NO"                : {"en": "NO",                   "de": "NEIN",                "ru": "НЕТ"},
    "TRUE"              : {"en": "TRUE",                 "de": "TRUE",                "ru": "ДА"},
    "false"             : {"en": "false",                "de": "false",               "ru": "нет"},
    "CCU.IO"            : {"en": "CCU.IO",               "de": "CCU.IO",              "ru": "CCU.IO"},
    "Addons"            : {"en": "Addons",               "de": "Addons",              "ru": "Дополнения"},
    "Adapter"           : {"en": "Adapter",              "de": "Adapter",             "ru": "Драйвера"},
    "Data"              : {"en": "Data",                 "de": "Daten",               "ru": "Данные"},
    "Info"              : {"en": "Info",                 "de": "Info",                "ru": "Информация"},
    "Control"           : {"en": "Control",              "de": "Steuerung",           "ru": "Контроль"},
    "Settings"          : {"en": "Settings",             "de": "Einstellungen",       "ru": "Настройки"},
    "CCU.IO installed Version:" : {"en": "CCU.IO installed Version:", "de": "Installierte CCU.IO Version:", "ru": "Локальная версия CCU.IO"},
    "CCU.IO available Version:" : {"en": "CCU.IO available Version:", "de": "Verfügbare CCU.IO Version:", "ru": "Доступная версия CCU.IO"},
    "update"            : {"en": "update",               "de": "update",              "ru": "обновить"},
    "check"             : {"en": "check",                "de": "prüfen",              "ru": "проверить"},
    "CCU reachable:"    : {"en": "CCU reachable:",       "de": "CCU erreichbar:",     "ru": "CCU полключена:"},
    "ReGa Up:"          : {"en": "ReGa Up:",             "de": "ReGa erreichbar:",    "ru": "ReGa запущена:"},
    "ReGa Data loaded:" : {"en": "ReGa Data loaded:",    "de": "ReGa-Data geladen:",  "ru": "Данные ReGa загружены:"},
    "RPC Inits:"        : {"en": "RPC Inits:",           "de": "RPC Inits:",          "ru": "RPC Inits:"},
    "script-engine enabled:" : {"en": "script-engine enabled:","de": "Script-Engine aktiviert:", "ru": "Script-engine запущена:"},
    "logging enabled:"  : {"en": "logging enabled:",     "de": "Logging aktiviert:",  "ru": "Протоколлирование:"},
    "Last ReGa poll:"   : {"en": "Last ReGa poll:",      "de": "Letzte ReGa-Anfrage:","ru": "Последний ReGa запрос:"},
    "Last rf event:"    : {"en": "Last rf event:",       "de": "Letzte rf-Ereignis:", "ru": "Последнее rf событие:"},
    "Last hs485 event:" : {"en": "Last hs485 event:",    "de": "Letzte hs485-Ereignis:","ru": "Последнее hs485 событие:"},
    "Last CUx event:"   : {"en": "Last CUx event:",      "de": "Letzte CUx-Ereignis:","ru": "Последнее CUxD событие:"},
    "restart CCU.IO"    : {"en": "restart CCU.IO",       "de": "Neustart CCU.IO",     "ru": "Перезапуск CCU.IO"},
    "refresh Addons"    : {"en": "refresh Addons",       "de": "Addons neu laden",    "ru": "Перезагрузить дополнения"},
    "reload ReGa data"  : {"en": "reload CCU data",      "de": "CCU-Daten neu laden", "ru": "Считать ReGa-данные заново"},
    "create Backup"     : {"en": "create Backup",        "de": "Backup erzeugen",     "ru": "Создать резервную копию"},
    "restart RPC inits" : {"en": "restart RPC inits",    "de": "RPC inits neu starten", "ru": "Перезапуск RPC inits"},
    "apply Backup"      : {"en": "apply Backup",         "de": "Backup anwenden",     "ru": "Применить резервную копию"},
    "create Snapshot"   : {"en": "create Snapshot",      "de": "Erzeuge Snapshot",    "ru": "Создать snapshot"},
    "restart script-engine" : {"en": "restart script-engine","de": "Script-Engine neu starten", "ru": "Перезапустить Script-Engine"},
    "save changes"      : {"en": "save changes",         "de": "Änderungen speichern", "ru": "Сохранить изменения"},
    "Base configuration": {"en": "Base configuration",   "de": "Basiskonfiguration",  "ru": "Основные настройки"},
    "CCU IP-Address"    : {"en": "CCU IP-Address",       "de": "CCU IP Adresse",      "ru": "IP Адрес CCU"},
    "CCU.IO IP-Address" : {"en": "CCU.IO IP-Address",    "de": "CCU.IO IP Adresse",   "ru": "IP Адрес CCU.IO"},
    "Stats"             : {"en": "Stats",                "de": "Statistik",           "ru": "Статистика"},
    "Enabled"           : {"en": "Enabled",              "de": "Ein",                 "ru": "Включено"},
    "Interval (minutes)": {"en": "Interval (minutes)",   "de": "Intervall (Minuten)", "ru": "Интервал (минуты)"},
    "Logging"           : {"en": "Logging",              "de": "Protokollierung",     "ru": "Протокол"},
    "Write Interval (s)": {"en": "Write Interval (s)",   "de": "Schreibintervall (s)","ru": "Интервал записи (сек)"},
    "Script-Engine"     : {"en": "Script-Engine",        "de": "Script-Engine",       "ru": "Script-Engine"},
    "Longitude"         : {"en": "Longitude",            "de": "Längengrad",          "ru": "Градус долготы"},
    "Latitude"          : {"en": "Latitude",             "de": "Breitengrad",         "ru": "Градус широты"},
    "Webserver"         : {"en": "Webserver",            "de": "Web-Server",          "ru": "Web Сервер"},
    "HTTP"              : {"en": "HTTP",                 "de": "HTTP",                "ru": "HTTP"},
    "Port"              : {"en": "Port",                 "de": "Port",                "ru": "Порт"},
    "Authentication"    : {"en": "Authentication",       "de": "Authentifizierung",   "ru": "Аутентификация"},
    "HTTPS"             : {"en": "HTTPS",                "de": "HTTPS",               "ru": "HTTPS"},
    "Username"          : {"en": "User name",            "de": "Benutzername",        "ru": "Имя пользователя"},
    "Password"          : {"en": "Password",             "de": "Kennwort",            "ru": "Пароль"},
    "Cache"             : {"en": "Cache",                "de": "Cache",               "ru": "Кэширование"},
    "HomeMatic RPC"     : {"en": "HomeMatic RPC",        "de": "HomeMatic RPC",       "ru": "HomeMatic RPC"},
    "CCU.IO RPC Server ": {"en": "CCU.IO RPC Server",    "de": "CCU.IO RPC Server",   "ru": "CCU.IO RPC Server"},
    "rfd Init"          : {"en": "rfd Init",             "de": "rfd Init",            "ru": "rfd Init"},
    "hs485d Init"       : {"en": "hs485d Init",          "de": "hs485d Init",         "ru": "hs485d Init"},
    "CUxD Init"         : {"en": "CUxD Init",            "de": "CUxD Init",           "ru": "CUxD Init"},
    "Check RPC Events"  : {"en": "Check RPC Events",     "de": "Prüfe RPC Ereignisse","ru": "Проверять RPC сообщения"},
    "Check rfd Events"  : {"en": "Check rfd Events",     "de": "Prüfe rfd Ereignisse","ru": "Проверять rfd сообщения"},
    "Virtual Key"       : {"en": "Virtual Key",          "de": "Virtual Key",         "ru": "Virtual Key"},
    "Check hs485d Events": {"en": "Check hs485d Events", "de": "Prüfe hs485d Ereignisse", "ru": "Проверять hs485d сообщения"},
    "HomeMatic ReGaHSS" : {"en": "HomeMatic ReGaHSS",    "de": "HomeMatic ReGaHSS",   "ru": "HomeMatic ReGaHSS"},
    "Polling"           : {"en": "Polling",              "de": "Polling",             "ru": "Polling"},
    "Interval (ms)"     : {"en": "Interval (ms)",        "de": "Intervall (ms)",      "ru": "Интервал (ms)"},
    "Polling Trigger"   : {"en": "Polling Trigger",      "de": "Polling-Trigger",     "ru": "Polling-Trigger"},
    "install addon"     : {"en": "install addon",        "de": "Addon installieren",  "ru": "Установить дополнение"},
    "...loading"        : {"en": "...loading",           "de": "...lade",             "ru": "...загрузка"},
    "adapter configuration" : {"en": "adapter configuration","de": "Adapter-Konfiguration", "ru": "Настройки драйвера"},
    "Save"              : {"en": "Save",                 "de": "Speichern",           "ru": "Сохранить"},
    "Save and close"    : {"en": "Save and close",       "de": "Speichern und schließen", "ru": "Сохранить и выйти"},
    "Discard changes and close": {"en": "Discard changes and close","de": "Änderungen verwerfen und schließen", "ru": "Выйти без сохранения"},
    "regaObjects"       : {"en": "regaObjects",          "de": "regaObjects",         "ru": "regaObjects"},
    "regaIndex"         : {"en": "regaIndex",            "de": "regaIndex",           "ru": "regaIndex"},
    "datapoints"        : {"en": "datapoints",           "de": "Datenpunkte",         "ru": "Значения"},
    "events"            : {"en": "events",               "de": "Ereignisse",          "ru": "События"},
    "Events"            : {"en": "Events",               "de": "Ereignisse",          "ru": "События"},
    "stringtable"       : {"en": "stringtable",          "de": "Text-Tabelle",        "ru": "Текст"},
    "datastore"         : {"en": "datastore",            "de": "datastore",           "ru": "datastore"},
    "refresh"           : {"en": "refresh",              "de": "Neu laden",           "ru": "Обновить"},
    "anonymize"         : {"en": "anonymize",           "de": "anonymisieren",        "ru": "Убрать персональную информацию"},
    "save changes"      : {"en": "save changes",         "de": "Änderungen speichern","ru": "Сохранить изменения"},
    "install"           : {"en": "install",              "de": "Installieren",        "ru": "Установить"},
    "CCU.IO is reloading all CCU data. Please be patient. This page will be automatically reloaded when finished.": {
        "en": "CCU.IO is reloading all CCU data. Please be patient. This page will be automatically reloaded when finished.",
        "de": "CCU.IO lädt alle Daten aus CCU neu. Bitte warten. Die Seite wird automatisch neu geladen, wenn Ladeforgang abgeschlossen wird.",
        "ru": "CCU.IO загружает все данные из CCU. Запаситесь терпением. Страница автоматически обновиться по окончании загрузки."
    },
    "CCU.IO is restarting.": {"en": "CCU.IO is restarting.", "de": "CCU.IO startet neu. ",       "ru": "CCU.IO перезапускается."},
    "name"              : {"en": "name",                  "de": "Name",               "ru": "Имя"},
    "enabled"           : {"en": "enabled",               "de": "Aktiviert",          "ru": "Активен"},
    "installed version" : {"en": "installed version",     "de": "Lokale Version",     "ru": "Локальная версия"},
    "available version" : {"en": "available version",     "de": "Verf. version",      "ru": "Доступная версия"},
    "homepage"          : {"en": "homepage",              "de": "Homepage",           "ru": "Домашняя страница"},
    "download"          : {"en": "download",              "de": "Laden",              "ru": "Загрузить"},
    "settings"          : {"en": "settings",              "de": "Einstellungen",      "ru": "Настройки"},
    "confed"            : {"en": "confed",                "de": "Konf.",              "ru": "СконФ."},
    "mode"              : {"en": "mode",                  "de": "Modus",              "ru": "Режим"},
    "period"            : {"en": "period",                "de": "Period",             "ru": "Период"},
    "Install Addon"     : {"en": "Install Addon",         "de": "Addon installieren", "ru": "Установить дополнение"},
    "reload"            : {"en": "reload",                "de": "neu laden",          "ru": "обновить"},
    "configure"         : {"en": "configure",             "de": "konfigurieren",      "ru": "настроить"},
    "periodical"        : {"en": "periodical",            "de": "periodisch",         "ru": "периодичный"},
    "Timestamp"         : {"en": "Timestamp",             "de": "Zeitstempel",        "ru": "Время"},
    "Severity"          : {"en": "Severity",              "de": "Stufe",              "ru": "Приоритет"},
    "Message"           : {"en": "Message",               "de": "Meldung",            "ru": "Сообщение"},
    "TypeName"          : {"en": "TypeName",              "de": "Typname",            "ru": "Тип"},
    "Name"              : {"en": "Name",                  "de": "Name",               "ru": "Имя"},
    "Parent Name"       : {"en": "Parent Name",           "de": "Kanal",              "ru": "Имя родителя"},
    "Value"             : {"en": "Value",                 "de": "Wert",               "ru": "Значение"},
    "ack"               : {"en": "ack",                   "de": "Best.",              "ru": "Подтв."},
    "lastChange"        : {"en": "lastChange",            "de": "Letzte Änderung",    "ru": "Последнее изменение"},
    "eventCount"        : {"en": "eventCount",            "de": "Anzahl Meldungen",   "ru": "Кол-во сообщений"},
    "Error"             : {"en": "Error",                 "de": "Fehler",             "ru": "Ошибка"},
    "File saved."       : {"en": "File saved.",           "de": "Datei gespeichert",  "ru": "Файл сохранён."},
    "CCU.IO disconnected":{"en": "CCU.IO disconnected",   "de": "Verbindung zu CCU.IO getrennt", "ru": "Связь с CCU.IO прервана"},
    "install started"   : {"en": "install started",       "de": "Installation gestartet","ru": "Установка начата"},
    "Object tree":        {"en": "Object tree",            "de": "Objektbaum"},
    "CCU.IO settings saved. Please restart CCU.IO" : {
        "en": "CCU.IO settings saved. Please restart CCU.IO",
        "de": "CCU.IO Einstellungen gespeichert. Bitte CCU.IO neu starten",
        "ru": "CCU.IO настройки сохранены. Перезапустите CCU.IO"
    },
    "Error: invalid JSON" : {"en": "Error: invalid JSON", "de": "Fehler: ungültiges JSON","ru": "Ошибка: неправильный формат JSON"},
    " adapter settings saved. Please restart CCU.IO" : {
        "en": " adapter settings saved. Please reload adapter",
        "de": " Adpater-Einstellungen gespeichert. Bitte Adapter neu laden",
        "ru": ": настройки сохранены. Перезапустите CCU.IO или драйвер"
    },
    "Apply backup started. Please be patient..." : {
        "en": "Apply backup started. Please be patient...",
        "de": "Apply backup started. Please be patient...",
        "ru": "Резервная копия распаковывается. Подождите..."
    },
    "Apply backup done. Restart CCU.IO" : {
        "en": "Apply backup done. Restart CCU.IO",
        "de": "Sicherung eingespielt. Bitte CCU.IO neu starten.",
        "ru": "Резервная копия распакована. Перезапустите CCU.IO"
    },
    "Error: Backup failed." : {
        "en": "Error: Backup failed.",
        "de": "Fehler: Sicherheitskopie konnte nicht erzeugt werden",
        "ru": "Ошибка: создание резервной копии не удалось."
    },
    "Backup started. Please be patient..." : {
        "en": "Backup started. Please be patient...",
        "de": "Sicherung wird erstellt. Bitte warten...",
        "ru": "Создание резервной копии запущено. Подождите..."
    },
    "Error: Snapshot failed." : {
        "en": "Error: creation of snapshot failed.",
        "de": "Fehler: Snapshot konnte nicht erzeugt werden",
        "ru": "Ошибка: создание Snapshot не удалось."
    },
    "Snapshot started. Please be patient..." : {
        "en": "Creation of snapshot started. Please be patient...",
        "de": "Snapshot wird erstellt. Bitte warten...",
        "ru": "Создание snapshot запущено. Подождите..."
    },
    "Update started. Please be patient..." : {
        "en": "Update started. Please be patient...",
        "de": "Update gestartet. Bitte warten...",
        "ru": "Обновление начато. Подождите..."
    },
    "Update done. Restarting..." : {
        "en": "Update done. Restarting...",
        "de": "Update beendet. Neustart...",
        "ru": "Обновление завершено. Перезагрузка..."
    },
    "Error: update failed." : {
        "en": "Error: update failed.",
        "de": "Fehler: update konnte nicht durchgeführt werden.",
        "ru": "Ошибка: обновление не удалось."
    }
};