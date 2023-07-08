
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

export function build_row(data) {

  data.authors = JSON.parse(data.authors);
  data.tags = JSON.parse(data.tags);

  /* eslint-disable eqeqeq */
  return `<article class="book">
    <div class="book-inner">

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
          <span class="tags-wrapper">
            ${data.amz? '<strong class="mr-1 badge">amz</strong>' : ''}
            ${data.tags.length?
              `${print_icon({id: 'tag', svg_class: 'icon top-adjust dark mr-1'})}
              <span class="tags">${data.tags.map(t => `<span role="button" data-tag-id="${t.id}">${t.name}</span>`).join('/')}</span>`
            : ''}
          </span>
          <span class="formats-wrapper">
           ${print_icon({id: 'file', svg_class: 'icon top-adjust dark mr-1'})}
          <span class="file-formats">${data.files_format?? '&mdash;'}</span>
          </span>
        </div>

        <div class="info">
          <time class="text-muted text-nowrap ml-1">
            ${data.timestamp?
              `${print_icon({id: 'calendar-blank', svg_class: 'icon top-adjust dark'})}
              ${new Date(data.timestamp).toLocaleString('it-IT', { year: '2-digit', month: 'short', day: 'numeric' })}`
            : ''}
          </time>

          <span>
            ${print_icon({id: 'books', svg_class: 'icon top-adjust dark mr-1'})}
            <span class="scaffale">${data.scaffale?? '\u2014'}</span>
          </span>

          ${(data.data_lettura || data.rating)?
            `<span>
              ${data.data_lettura? print_icon({id: 'eyeglasses', svg_class: 'icon top-adjust dark'}) : ''}
              <span class="text-muted mx-1">${data.data_lettura? new Date(data.data_lettura).toLocaleString('it-IT', { year: '2-digit', month: 'short', day: 'numeric' }) : ''}</span>
              <span class="rating">${data.rating? '\u2605'.repeat(data.rating) : ''}</span>
            </span>`
          : ''}
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
      <button type="button"${!data.comment? ' disabled' : ''}>${print_icon({id: 'chat-centered-text', svg_class: 'icon'})}</button>
    </div>
    ${data.comment? `<section class="details">
      <div>
        ${data.comment}
      </div>
    </section>` : ''}
  </article>`;
  /* eslint-enable eqeqeq */
}
