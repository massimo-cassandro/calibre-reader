/* eslint-disable no-console */
/* global process */

import * as ftp from 'basic-ftp';
import * as path from 'path';
import * as fs from 'fs';
// import * as url from 'url';
import 'dotenv/config'; // or --env-file=.env calling the script (node >= 20)

// https://github.com/patrickjuchli/basic-ftp#readme

const __dirname = new URL('.', import.meta.url).pathname;


export async function ftpUploader() {

  /*
    filesArray = [[source1, dest1], [source2, dest2]...]
    dir = path to dir to upload
  */

  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PWD,
      secure: false
    });
    // console.log(await client.list());

    // calibre db
    await client.uploadFrom(path.join(process.env.HOME, '/Google Drive/ebook-calibre/metadata.db'), '/htdocs/db/metadata.db');

    // covers
    // NB carica anche DS_Store
    // await client.uploadFromDir(path.resolve(__dirname, '../../../dist/covers'), '/htdocs/calibre-reader/covers');

    // lettura dir covers
    const covers = [];
    fs.readdirSync(path.resolve(__dirname, '../../../dist/covers'),)
      // .filter(f => /\.js$/.test(f))
      .filter(f => f !== '.DS_Store')
      .forEach(file => {
        covers.push(file);
      });

    for await (const file of covers) {
      await client.uploadFrom(
        path.resolve(__dirname, `../../../dist/covers/${file}`),
        `/htdocs/calibre-reader/covers/${file}`
      );
    }


  } catch(err) {
    console.log(err);
  }

  client.close();
}

