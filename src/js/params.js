/* global process */

// const isDev = process.env.NODE_ENV === 'development';

export const params = {

  result_wrapper    : document.querySelector('.result-wrapper'),
  search_form       : document.querySelector('.search-form'), // fieldset
  observer_element  : null,
  spinner_wrapper   : document.querySelector('.spinner-wrapper'),

  orderByBtnsFset   : document.querySelector('.search-options.orderBy'),
  filterBtnsFset    : document.querySelector('.search-options.filter'),
  searchFieldsFset  : document.querySelector('.searchFields'),

  covers_base_url   : process.env.COVERS_BASE_URL,
  get_data_url      : new URL(process.env.API_URL + '/php/get-data.php', location.href),
  get_list_url      : new URL(process.env.API_URL + '/php/get-list.php', location.href)
};

