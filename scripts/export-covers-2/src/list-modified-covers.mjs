/* eslint-disable no-console */
/* eslint-env node */

import * as fs from 'fs';
// import * as path from 'path';
// import { URL } from 'url';

import { params } from './params.mjs';


const last_import = new Date('2023-08-13'), //params.last_import),

  getModifiedCovers = dir => {

    try {
      fs.readdirSync(dir).forEach(file => {
        const thisPath = `${dir}/${file}`;

        if (fs.statSync(thisPath).isDirectory()) {
          getModifiedCovers(thisPath);

        } else {

          if(file === 'cover.jpg') {

            fs.stat(dir + '/cover.jpg', (err, stats) => {
              if (err) {
                throw err;
              }

              if(stats.mtime > last_import) {
                console.log(dir + '/cover.jpg');
                console.log(stats.mtime);
              }

            });
          }

        }
      });

    } catch(e) {
      console.error( e ); // eslint-disable-line
    } // finally {}

  };


getModifiedCovers(params.calibre_dir);
