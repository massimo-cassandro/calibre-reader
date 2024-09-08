import terser  from '@rollup/plugin-terser';
// import fs from 'fs';
import node_resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

// https://github.com/hyhappy/rollup-plugin-string-html
// import htmlString from 'rollup-plugin-string-html';

// https://github.com/exuanbo/rollup-plugin-minify-html-template-literals
// https://github.com/asyncLiz/minify-html-literals
// https://github.com/kangax/html-minifier#options-quick-reference
// import minifyHTML from 'rollup-plugin-minify-html-template-literals';

import p from './package.json' with { type: 'json' };

const terserOptions = {
    compress: {
      passes: 2
    }
  },
  anno = new Date().getFullYear();


export default [
  {
    input: './src/calibre-reader.js',
    plugins: [
      // deve essere il primo
      // minifyHTML({
      //   options: {
      //     minifyOptions: {
      //       html5: true,
      //       collapseWhitespace: true,
      //       collapseInlineTagWhitespace: true,
      //       conservativeCollapse: true,
      //       decodeEntities: true
      //     },
      //     shouldMinify: () => true
      //   },
      // }),
      node_resolve(),
      commonjs(),
      terser(terserOptions),
      json()
    ],
    output: [
      {
        file: './dist/calibre-reader-min.js',
        format: 'iife',
        sourcemap: true,
        banner: `/*! Calibre-reader v.${p.version} - Massimo Cassandro 2023-${anno} */`,
        // footer: `//! ${new Date().toLocaleString('it-IT', {
        //   year: 'numeric',
        //   month: 'short',
        //   day: '2-digit', // 'numeric
        //   hour12: false,
        //   hour:'2-digit',
        //   minute:'2-digit'
        // })}`
      }
    ]
  }
];

