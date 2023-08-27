import { append_rows } from './js/append-rows';
import { params } from './js/params';


// https://github.com/biati-digital/glightbox#readme

// LISTENERS
let search_params = {},
  search_info = null;

const searchInput = params.search_form.querySelector('.search-input'),
  search_info_container= params.search_form.querySelector('.search-info'),

  execute_search = async () => {
    // console.log(search_params);

    search_info_container.innerHTML = search_info?
      `<em>Ricerca per</em><br>${search_info.type}: <strong>${search_info.value}</strong>`
      : '';

    const orderBy = document.querySelector('.search-options input:checked')?.value?? null;
    await append_rows({...search_params, orderBy: orderBy});

  };

// btn esegui ricerca
const input_search = async isReset => {
  search_params = isReset? {} : {q: searchInput.value.trim()};
  search_info = null;
  await execute_search();
  if(isReset) {
    // searchInput.disabled = false;
    searchInput.focus({ focusVisible: true });
  }
};
params.search_form.querySelector('.search-btn').addEventListener('click', () => {
  input_search();
}, false);

// esegui ricerca: invio su input search
searchInput.addEventListener('keydown', e => {
  if (e.code === 'Enter') {
    input_search();
  }
}, false);

// reset
params.search_form.querySelector('.reset-btn').addEventListener('click', () => {
  searchInput.value = '';
  params.result_wrapper.innerHTML = '';
  params.search_form.querySelector('[type="radio"]:first-of-type').checked = true;

  input_search(true);

}, false);

// orderBy
document.querySelector('.search-options')?.addEventListener('click', e => {

  if(e.target.classList.contains('orderBy-btn')) {

    const radio = document.getElementById(e.target.getAttribute('for'));
    radio.checked = true;

    execute_search();
  }
}, false);


// click authors & series
params.result_wrapper.addEventListener('click', e => {

  // authors
  if(e.target.hasAttribute('data-author-id')) {

    document.getElementById('orderBy-year').click();

    search_info = {
      type: 'autore',
      value: e.target.innerText
    };
    search_params = {
      authorId: +e.target.dataset.authorId,
    };
    searchInput.value = '';
    execute_search();
  }

  // series
  if(e.target.closest('[data-serie-id]')) {


    const target = e.target.closest('[data-serie-id]');
    document.getElementById('orderBy-serie').click();

    search_info = {
      type: 'serie',
      value: target.closest('[data-serie-id]').querySelector('span').innerText
    };
    search_params = {
      serieId: +target.dataset.serieId,
    };
    searchInput.value = '';
    execute_search();
  }


  // tags
  if(e.target.hasAttribute('data-tag-id')) {

    search_info = {
      type: 'tag',
      value: e.target.innerText
    };
    search_params = {
      tagId: +e.target.dataset.tagId,
    };
    searchInput.value = '';
    execute_search();
  }

  // scaffale
  if(e.target.hasAttribute('data-scaffale-id')) {

    document.getElementById('orderBy-serie').click();

    search_info = {
      type: 'scaffale',
      value: e.target.innerText
    };
    search_params = {
      scaffaleId: +e.target.dataset.scaffaleId,
    };
    searchInput.value = '';
    execute_search();
  }


  // https://frontendcoding.com/getting-the-height-of-a-hidden-element/
  function getHiddenHeight(el) {
    if(!el?.cloneNode) {
      return null;
    }

    // // lazy images
    // let img_height = 0;
    // const cover = el.querySelector('.cover img[loading="lazy"]');
    // if(cover) {
    //   console.log('cover');
    //   cover.loading = 'eager';
    //   cover.fetchPriority = 'high';
    //   img_height = cover.naturalHeight;
    //   console.log(1, img_height);
    // }

    const clone = el.cloneNode(true);
    Object.assign(clone.style, {
      overflow: 'visible',
      height: 'auto',
      maxHeight: 'none',
      opacity: '0',
      visibility: 'hidden',
      display: 'block',
    });

    el.after(clone);
    const height = clone.offsetHeight;

    clone.remove();

    return height;
  }

  // details
  if(e.target.closest('.details-trigger')) {
    const item_container = e.target.closest('.book'),
      details = item_container.querySelector('.details');

    // if(!details.dataset.height) {
    //   details.dataset.height = getHiddenHeight(details);
    //   details.style.setProperty('--details-height', details.dataset.height +'px');
    // }
    if(!getComputedStyle(details).getPropertyValue('--details-height')) {
      details.style.setProperty('--details-height', getHiddenHeight(details) +'px');
    }

    item_container.classList.toggle('details-on');
  }


}, false);


// avvio
execute_search();
