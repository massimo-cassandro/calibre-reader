import { params } from './params';
import { build_row } from './build-row';
// import { print_icon } from './print-icon';


let search_params = {},
  observer_element = null;

const search_params_defaults = {
    q: null,
    orderBy: null,
    authorId: null,
    pag: 0,
    limit: 20,
    serieId: null
  },

  observer_markup = '<div id="observer" class="p-1"></div>',
  spinner_wrapper = document.querySelector('.spinner-wrapper'),

  scrolling_observer = new IntersectionObserver( (entries) => {
    if( entries[0].isIntersecting) {
      search_params.pag++;
      append_rows(search_params);
    }
  },{
    threshold: 0,
    rootMargin: '40px 0px' // NB: valori bassi (20px) possono influire con browser mobili con barra indirizzi a scomparsa
  });


export async function append_rows(user_params = {}) {

  search_params = {...search_params_defaults, ...user_params};

  // console.log(search_params);

  async function get_data() {

    if(search_params.pag === 0) {
      window.scrollTo(0, 0);
      params.result_wrapper.innerHTML = '';
      observer_element?.remove();
      observer_element = null;
    }

    const url = new URL('./get-data.php', location.href),
      urlParams = url.searchParams;

    for(const i in search_params) {
      if(search_params[i]) {
        urlParams.set(i, search_params[i]);
      }
    }


    // console.log(url.toString());

    const response = await fetch(url.toString()),
      data = await response.json();
    return data;

  }

  params.search_form.disabled = true;
  spinner_wrapper.classList.remove('off');

  const data = await get_data();

  if(data.length < search_params.limit && observer_element) {
    scrolling_observer.unobserve(observer_element);
    observer_element.remove();
    observer_element = null;
  }

  params.result_wrapper.insertAdjacentHTML('beforeend',
    data.map(row => build_row(row)).join('')
  );



  if(data.length < search_params.limit ) {
    params.result_wrapper.insertAdjacentHTML('beforeend',
      '<div class="bookend"><img src="/favicon.svg" alt=""></div>'
    );
  }

  if(!observer_element && data.length === search_params.limit) {
    params.result_wrapper.insertAdjacentHTML('afterend', observer_markup);
    observer_element = document.getElementById('observer');
    scrolling_observer.observe(observer_element);
  }

  spinner_wrapper.classList.add('off');
  params.search_form.disabled = false;

  // console.log('observer_element', observer_element !== null, 'pag', search_params.pag);

}
