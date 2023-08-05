/* eslint-disable no-console */
/* eslint-env node */

/*
Esporta nella dir dist/covers una copia delle copertine dal catalogo calibre, se non presenti
o se quelle originali sono più recenti
*/


import * as fs from 'fs';
// import * as path from 'path';
// import { URL } from 'url';

import sqlite3 from 'sqlite3';

import { params } from './src/params.mjs';
import { parseCover } from './src/parseCover.mjs';

sqlite3.verbose();

const db = new sqlite3.Database(params.db_file, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to `db_file`.');
});

// ultima importazione
if(fs.existsSync(params.last_import_file)) {
  params.last_import = JSON.parse(fs.readFileSync(params.last_import_file));
}


// https://www.sqlitetutorial.net/sqlite-nodejs/
let q = `SELECT id, path from books
  WHERE has_cover = 1`;

if( params.last_import != null) {
  q += ` AND (last_modified > '${params.last_import.date}' OR id > '${params.last_import.id}')`;

} else {
  params.last_import = {};
}

q += ' ORDER BY id /* LIMIT 0,50 */';

// aggiornamento data
// replace per adeguamwnto a formato sqlite
params.last_import.date = (new Date()).toISOString().replace('T', ' ');

db.all(q, [], (err, rows) => {
  if (err) {
    throw err;
  }

  console.log(`processing ${rows.length} rows...`);

  rows.forEach((row) => {

    parseCover(row.id, row.path);

  });
  console.log('*** END ***');
});

// close the database connection
db.close();

