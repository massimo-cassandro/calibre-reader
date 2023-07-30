/* eslint-env node */

import { URL } from 'url';
import * as path from 'path';

const current_dir = new URL('.', import.meta.url).pathname;

const params = {
  calibre_dir: path.resolve(current_dir, '../../../../../../Google Drive/ebook-calibre'),
  last_import_file: path.resolve(current_dir, '../last-import.json'),
  last_import: null,
  output_dir: path.resolve(current_dir, '../../../dist/covers'),
  cover_width: 340
};

params.db_file = params.calibre_dir + '/metadata.db';

// console.log(current_dir);
// console.log(params);

export { params };
