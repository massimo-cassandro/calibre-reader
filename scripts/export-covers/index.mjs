/* eslint-disable no-console */
/* eslint-env node */

/*
Esporta nella dir dist/covers una copia delle copertine dal catalogo calibre, se non presenti
o se quelle originali sono più recenti
*/


import * as fs from 'fs';
// import * as path from 'path';
// import { URL } from 'url';
// import 'dotenv/config';
import  { exec } from 'node:child_process';

import sqlite3 from 'sqlite3';

import { params } from './src/params.mjs';
import { coverHasBeenModified } from './src/check-cover-modified-date.mjs';
import { parseCover } from './src/parseCover.mjs';
import { ftpUploader } from './src/ftpUploader.mjs';

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

const last_import_date = params.last_import?.date? new Date(params.last_import.date) : null;


// https://www.sqlitetutorial.net/sqlite-nodejs/
let q = `SELECT id, path from books
  WHERE has_cover = 1`;

if( params.last_import != null) {
  q += ` AND (last_modified > '${params.last_import.date.replace('T', ' ')}' OR id > '${params.last_import.id}')`;

} else {
  params.last_import = {};
}

q += ' ORDER BY id /* LIMIT 0,50 */';

// aggiornamento data
params.last_import.date = (new Date()).toISOString();

(async () => {
  // 'use strict';

  db.all(q, [], (err, rows) => {
    if (err) {
      throw err;
    }

    console.log(`processing ${rows.length} rows...`);

    rows.forEach((row) => {

      // verifica se il file è stato creato/modificato dopo last_import_date
      let need_update = true;
      if(last_import_date) {
        need_update = coverHasBeenModified(row.path, last_import_date);
      }
      console.log(row.id, need_update);

      if(need_update) {
        parseCover(row.id, row.path);
      } else {
        console.log(`...${row.id} not modified`);
      }
    });

  });


  await ftpUploader();
  // close the database connection
  db.close();

  console.log('*** END ***');
  exec('osascript -e \'display notification "Calibre sync completato" with title "Calibre Sync"\'');

})();


