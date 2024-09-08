
/*
[
  "id",
  "title",
  "title_sort",
  "pubdate",
  "timestamp",
  "author",
  "author_sort",
  "serie",
  "series_index",
  "publisher",
  "tags",
  "comment",
  "rating",
  "amz",
  "lettura",
  "data_lettura"
]
*/

import { print_icon } from './print-icon';

function dateStringToIso(str) {
  const d = new Date(str);
  return  d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
}


export function build_row(data) {

  let covers_base_url = './covers';
  if(window.location.origin === 'http://localhost:8000' ) {
    covers_base_url = 'http://calibre-reader.mazx.it/covers';
  }

  data.authors = JSON.parse(data.authors);
  data.tags = JSON.parse(data.tags);

  /* eslint-disable eqeqeq */
  return `<article class="book">
    <div class="book-inner">

      <div class="book-cover">
        ${+data.has_cover? `<img src="${covers_base_url}/${data.id}-minia.avif" alt="Cover" loading="lazy">` : ''}
      </div>

      <div class="book-data">
        <div class="author">
          ${data.authors.map(a => `<span role="button" data-author-id="${a.id}">${a.name}</span>`).join(', ')}
        </div>
        <h2 class="title">${data.title}</h2>
        ${data.serie? `<div class="serie" role="button" data-serie-id="${data.serie_id}"><span>${data.serie}</span> ${data.series_index}</div>` : ''}
        <div class="publisher">
          ${data.prima_ediz?  `<time title="Anno prima edizione">${data.prima_ediz}</time> / ` : ''}
          ${data.publisher?? '\u2014'} ${(data.pub_year && data.pub_year != '0101')? ` (<time>${data.pub_year}</time>)` : ''}
        </div>

        <div class="info">
          ${(data.tags.length) ?
            `<span class="tags-wrapper">
              ${data.tags.length?
                `${print_icon({id: 'tag', svg_class: 'icon top-adjust dark'})}
                <span class="tags">${data.tags.map(t => `<span role="button" data-tag-id="${t.id}">${t.name}</span>`).join('/')}</span>`
              : ''}
            </span>`
          : ''}


          ${data.timestamp?
            `<time class="text-muted text-nowrap" datetime="${dateStringToIso(data.timestamp)}">
              ${print_icon({id: 'calendar-blank', svg_class: 'icon top-adjust dark'})}
              ${new Date(data.timestamp).toLocaleString('it-IT', { year: '2-digit', month: 'short', day: 'numeric' })}
            </time>`
          : ''}

          <span class="formats-wrapper">
            ${print_icon({id: 'file', svg_class: 'icon top-adjust dark'})}
            <span class="file-formats">${data.files_format?? '&mdash;'}</span>
          </span>

        </div>

        <div class="info">
          ${data.amz? `${print_icon({id: 'amazon-logo-fill', svg_class: 'icon icon-lg top-adjust'})}` : ''}

          ${(data.data_lettura || data.rating)?
            `<span>
              ${data.data_lettura? print_icon({id: 'eyeglasses', svg_class: 'icon top-adjust dark'}) : ''}
              <time class="text-muted mx-1" datetime=${dateStringToIso(data.data_lettura)}>${data.data_lettura? new Date(data.data_lettura).toLocaleString('it-IT', { year: '2-digit', month: 'short', day: 'numeric' }) : ''}</time>
              <span class="rating">${data.rating? '\u2605'.repeat(data.rating) : ''}</span>
            </span>`
          : ''}

          <span>
            ${print_icon({id: 'books', svg_class: 'icon top-adjust dark'})}
            <span class="scaffale">${data.scaffale? `<span role="button" data-scaffale-id="${data.scaffale_id}">${data.scaffale}</span>` : '\u2014'}</span>
          </span>

        </div>
      </div>

      <div class="book-utils">
        <a href="https://www.google.it/search?q=${encodeURIComponent(data.authors.map(a => a.name).join(', '))}" target="_blank" rel="noopener noreferrer">
          ${print_icon({id: 'google-logo', svg_class: 'icon bold'})}
        </a>

        <a href="https://www.amazon.it/s?k=${encodeURIComponent(data.authors.map(a => a.name).join(', '))}&i=digital-text" target="_blank" rel="noopener noreferrer">
          ${print_icon({id: 'amazon-logo', svg_class: 'icon bold'})}
        </a>
      </div>

    </div>

    <div class="details-trigger">
      <button type="button"${(!data.comment && !data.has_cover)? ' disabled' : ''}>
        ${print_icon({id: (data.comment || (!data.comment && !data.has_cover))? 'chat-centered-dots' : 'image', svg_class: 'icon'})}
      </button>
    </div>
    ${(data.comment || data.has_cover)? `<section class="details">
      <div>
      ${data.comment?? ''}
      ${+data.has_cover? `<div class="cover"><img src="${covers_base_url}/${data.id}.avif" alt="Cover" loading="lazy"></div>` : ''}
      </div>
    </section>` : ''}
  </article>`;
  /* eslint-enable eqeqeq */
}
