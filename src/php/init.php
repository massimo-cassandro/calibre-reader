<?php

$db_file = '../db/metadata.db';

require_once './init-dev.php';

// var_dump($db_file);

$db = new SQLite3($db_file, SQLITE3_OPEN_READONLY);

$SqlLite_version = SQLite3::version()['versionNumber'];
$isRecentSqlLite = $SqlLite_version >= 3030000;
