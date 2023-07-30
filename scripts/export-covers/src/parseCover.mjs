/* eslint-disable no-console */
/* eslint-env node */

import * as fs from 'fs';
// import * as path from 'path';
// import { URL } from 'url';

import { params } from './params.mjs';


import sharp from 'sharp';
// import imagemin from 'imagemin';
// import imageminJpegtran from 'imagemin-jpegtran';
// import imageminPngquant from 'imagemin-pngquant';

export async function parseCover(id, path) {

  console.log(`processing ${id}...`);

  const original_cover = params.calibre_dir + '/' + path + '/cover.jpg';

  try {

    await sharp(original_cover)
      .resize({ width: params.cover_width, fit: 'inside' })
      .webp({
        lossless: false,
        quality: 75
      })
      /* .jpeg()
      // .then(info => console.log(info))
      // .toFile(`${output_dir}/${size[0]}`)
      .toBuffer()
      .then(bufferData => {

        // ottimizzazione JPG
        // https://github.com/imagemin/imagemin
        // https://github.com/imagemin/imagemin-pngquant
        // https://github.com/imagemin/imagemin-jpegtran
        // https://web.dev/use-imagemin-to-compress-images/

        imagemin.buffer(bufferData, {
          plugins: [
            imageminJpegtran({progressive: true}),

          ]
        }).then( result => {
          fs.writeFileSync(`${output_dir}/${size[0]}`, result);

          // aggiornamento last_import_file
          // aggiornamento ad ogni ciclo per non perdere l'id in caso di errori
          params.last_import.id = id;
          fs.writeFileSync(params.last_import_file, JSON.stringify(params.last_import));

        });

      }) */
      .toBuffer()
      .then( result => {
        fs.writeFileSync(`${params.output_dir}/${id}.webp`, result);

        // aggiornamento last_import_file
        // aggiornamento ad ogni ciclo per non perdere l'id in caso di errori
        params.last_import.id = id;
        fs.writeFileSync(params.last_import_file, JSON.stringify(params.last_import));

      })
      .catch(err => { throw err; });

  } catch(e) {
    console.error( e ); // eslint-disable-line

  }

}
