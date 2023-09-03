/* eslint-disable no-console */
/* eslint-env node */

import * as fs from 'fs';
// import * as path from 'path';
// import { URL } from 'url';

import { params } from './params.mjs';


export function coverHasBeenModified(path, check_date) {

  const cover = params.calibre_dir + '/' + path + '/cover.jpg';
  if(fs.existsSync(cover)) {

    const stats = fs.statSync(cover);
    if(stats.mtime > check_date) {
      return true;
    }
  }
  return false;
}
