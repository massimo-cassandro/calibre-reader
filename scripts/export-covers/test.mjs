/* eslint-disable no-console */
/* eslint-env node */

/*
Esporta nella dir dist/covers una copia delle copertine dal catalogo calibre, se non presenti
o se quelle originali sono più recenti
*/


import * as fs from 'fs';
import * as path from 'path';
// import { URL } from 'url';
import 'dotenv/config';
import  { exec } from 'node:child_process';
import * as url from 'url';





// console.log(process.env.HOME);
// console.log([path.join(process.env.HOME, '/Google Drive/ebook-calibre/metadata.db'), '/htdocs/db/metadata.db']);

const __dirname = new URL('.', import.meta.url).pathname;

console.log(path.resolve(__dirname, '../../dist/covers'));
