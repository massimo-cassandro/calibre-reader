import { params } from './params';

// TODO annulla filtro
// TODO filtri separati con interfaccia caricata ad hoc?
// TODO annulla filtro (torna alla lista)

export function loadList(list) {

  params.search_form.disabled = true;
  params.spinner_wrapper.classList.remove('off');

  params.observer_element?.remove();
  params.result_wrapper.innerHTML = '';

  const url = params.get_list_url;
  const searchParams = new URLSearchParams(url.search);
  searchParams.set('l', list);
  url.search = searchParams.toString();

  (async () => {
    const response = await fetch(url),
      data = await response.json();
    return data;
  })()
    .then(data => {


      params.result_wrapper.innerHTML = '<p class="text-center mt-1"><button class="btn btn-outline" type="button" id="reset-filter">Annulla</button></p>' +

      '<ul class="list">' +
        data.map(item => `<li role="button" data-${list}-id="${item.id}">${item.name}</li>`).join('') +
      '</ul>';

      params.spinner_wrapper.classList.add('off');
      params.search_form.disabled = false;
      params.orderByBtnsFset.disabled = true;
      params.searchFieldsFset.disabled = true;


    })
    .catch(err => {
      /* eslint-disable no-console */
      console.error(url);
      console.error(err);
      /* eslint-enable no-console */

      alert('Si è verificato un errore (getList)');
    });



}
