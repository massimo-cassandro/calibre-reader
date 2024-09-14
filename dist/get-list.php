<?php

$db_file = '../db/metadata.db';

// local file
if($_SERVER['HTTP_HOST'] == 'localhost:8000') {
  $db_file = '/Users/mazz/Google Drive/ebook-calibre/metadata.db';
}

$db = new SQLite3($db_file, SQLITE3_OPEN_READONLY);

$SqlLite_version = SQLite3::version()['versionNumber'];

$list = $_GET['l'];


if($list == 'author') {

  $q = "select id, sort as name from authors ORDER BY sort";

} else if($list == 'tag') {
  $q = "select id, name from tags ORDER BY name";


} else { // scaffali
  $q = "select id, value as name from custom_column_23 ORDER BY value";
}


$statement = $db->prepare($q);

// var_dump($statement->getSQL(true)); exit;

$result = $statement->execute();


$list = [];


while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
  $list[] = $row;
}

header("Content-Type: application/json; charset=utf-8");
echo json_encode($list); //  JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK