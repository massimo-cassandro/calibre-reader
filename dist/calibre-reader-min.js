/*! Calibre-reader v.0.10.0 - Massimo Cassandro 2023-2024 */
!function(){"use strict";const e={result_wrapper:document.querySelector(".result-wrapper"),search_form:document.querySelector(".search-form"),observer_element:null,spinner_wrapper:document.querySelector(".spinner-wrapper"),orderByBtnsFset:document.querySelector(".search-options.orderBy"),filterBtnsFset:document.querySelector(".search-options.filter"),searchFieldsFset:document.querySelector(".searchFields")};var t="0.11.1";function a(e){return function(e){e={id:"",svg_class:"icona",icon_file:"/imgs/icone.svg",title:"",descr:"",aria_hidden:!1,...e},Array.isArray(e.id)||(e.id=[e.id]),1===e.id.length&&(/-line$/.test(e.id)?e.svg_class=`${e.svg_class} line-icon`.trim():/-fill$/.test(e.id)&&(e.svg_class=`${e.svg_class} fill-icon`.trim()));let t=e.id.join("")+Number(Math.round(Math.random()*Date.now())).toString(36),a=[],r=null,s="";e.descr&&(e.aria_hidden=!1,r="d-"+t,a.push(r),s=`<desc id="${r}">${e.descr}</desc>`);let n=null,i="";e.title&&(e.aria_hidden=!1,n="t-"+t,a.push(n),i=`<title id="${n}">${e.title}</title>`);let o=['role="img"'];return e.svg_class&&o.push(`class="${e.svg_class}"`),e.aria_hidden&&o.push('aria-hidden="true"'),a.length&&o.push(`aria-labelledby="${a.join(" ")}"`),`<svg ${o.join(" ")}>\n    ${i}${s}\n    ${e.id.map((t=>{let a="";return e.id.length>1&&(a=t,/-line$/i.test(t)?a+=" line-icon":/-fill$/i.test(t)&&(a+=" fill-icon")),a=a?` class="${a}"`:"",`<use xlink:href="${e.icon_file}#${t}"${a}></use>`})).join("")}</svg>`}({...e,icon_file:"./icons.svg?v="+t})}function r(e){const t=new Date(e);return t.getFullYear()+"-"+String(t.getMonth()+1).padStart(2,"0")+"-"+String(t.getDate()).padStart(2,"0")}let s={};const n={q:null,orderBy:null,authorId:null,pag:0,limit:20,serieId:null},i=new IntersectionObserver((e=>{e[0].isIntersecting&&(s.pag++,o(s))}),{threshold:0,rootMargin:"40px 0px"});async function o(t={}){s={...n,...t},e.search_form.disabled=!0,e.spinner_wrapper.classList.remove("off");const o=await async function(){0===s.pag&&(window.scrollTo(0,0),e.result_wrapper.innerHTML="",e.observer_element?.remove(),e.observer_element=null);const t=new URL("./get-data.php",location.href),a=t.searchParams;for(const e in s)s[e]&&a.set(e,s[e]);const r=await fetch(t.toString());return await r.json()}();o.length<s.limit&&e.observer_element&&(i.unobserve(e.observer_element),e.observer_element.remove(),e.observer_element=null),e.result_wrapper.insertAdjacentHTML("beforeend",o.map((e=>function(e){let t="./covers";return"http://localhost:8000"===window.location.origin&&(t="http://calibre-reader.mazx.it/covers"),e.authors=JSON.parse(e.authors),e.tags=JSON.parse(e.tags),`<article class="book">\n    <div class="book-inner">\n\n      <div class="book-cover">\n        ${+e.has_cover?`<img src="${t}/${e.id}-minia.avif" alt="Cover" loading="lazy">`:""}\n      </div>\n\n      <div class="book-data">\n        <div class="author">\n          ${e.authors.map((e=>`<span role="button" data-author-id="${e.id}">${e.name}</span>`)).join(", ")}\n        </div>\n        <h2 class="title">${e.title}</h2>\n        ${e.serie?`<div class="serie" role="button" data-serie-id="${e.serie_id}"><span>${e.serie}</span> ${e.series_index}</div>`:""}\n        <div class="publisher">\n          ${e.prima_ediz?`<time title="Anno prima edizione">${e.prima_ediz}</time> / `:""}\n          ${e.publisher??"—"} ${e.pub_year&&"0101"!=e.pub_year?` (<time>${e.pub_year}</time>)`:""}\n        </div>\n\n        <div class="info">\n          ${e.tags.length?`<span class="tags-wrapper">\n              ${e.tags.length?`${a({id:"tag",svg_class:"icon top-adjust dark"})}&nbsp;<span class="tags">${e.tags.map((e=>`<span role="button" data-tag-id="${e.id}">${e.name}</span>`)).join("/")}</span>`:""}\n            </span>`:""}\n\n\n          ${e.timestamp?`<time class="text-muted text-nowrap" datetime="${r(e.timestamp)}">\n              ${a({id:"calendar-blank",svg_class:"icon top-adjust dark"})}\n              ${new Date(e.timestamp).toLocaleString("it-IT",{year:"2-digit",month:"short",day:"numeric"})}\n            </time>`:""}\n\n          <span class="formats-wrapper">\n            ${a({id:"file",svg_class:"icon top-adjust dark"})}\n            <span class="file-formats">${e.files_format??"&mdash;"}</span>\n          </span>\n\n        </div>\n\n        <div class="info">\n          ${e.amz?`${a({id:"amazon-logo-fill",svg_class:"icon icon-lg top-adjust"})}`:""}\n\n          ${e.data_lettura||e.rating?`<span>\n              ${e.data_lettura?a({id:"eyeglasses",svg_class:"icon top-adjust dark"}):""}\n              <time class="text-muted mx-1" datetime=${r(e.data_lettura)}>${e.data_lettura?new Date(e.data_lettura).toLocaleString("it-IT",{year:"2-digit",month:"short",day:"numeric"}):""}</time>\n              <span class="rating">${e.rating?"★".repeat(e.rating):""}</span>\n            </span>`:""}\n\n          <span>\n            ${a({id:"books",svg_class:"icon top-adjust dark"})}\n            <span class="scaffale">${e.scaffale?`<span role="button" data-scaffale-id="${e.scaffale_id}">${e.scaffale}</span>`:"—"}</span>\n          </span>\n\n        </div>\n      </div>\n\n      <div class="book-utils">\n        <a href="https://www.google.it/search?q=${encodeURIComponent(e.authors.map((e=>e.name)).join(", "))}" target="_blank" rel="noopener noreferrer">\n          ${a({id:"google-logo",svg_class:"icon bold"})}\n        </a>\n\n        <a href="https://www.amazon.it/s?k=${encodeURIComponent(e.authors.map((e=>e.name)).join(", "))}&i=digital-text" target="_blank" rel="noopener noreferrer">\n          ${a({id:"amazon-logo",svg_class:"icon bold"})}\n        </a>\n      </div>\n\n    </div>\n\n    <div class="details-trigger">\n      <button type="button"${e.comment||e.has_cover?"":" disabled"}>\n        ${a({id:e.comment||!e.comment&&!e.has_cover?"chat-centered-dots":"image",svg_class:"icon"})}\n      </button>\n    </div>\n    ${e.comment||e.has_cover?`<section class="details">\n      <div>\n      ${e.comment??""}\n      ${+e.has_cover?`<div class="cover"><img src="${t}/${e.id}.avif" alt="Cover" loading="lazy"></div>`:""}\n      </div>\n    </section>`:""}\n  </article>`}(e))).join("")),o.length<s.limit&&e.result_wrapper.insertAdjacentHTML("beforeend",'<div class="bookend"><img src="/favicon.svg" alt=""></div>'),e.observer_element||o.length!==s.limit||(e.result_wrapper.insertAdjacentHTML("afterend",'<div id="observer" class="p-1"></div>'),e.observer_element=document.getElementById("observer"),i.observe(e.observer_element)),e.spinner_wrapper.classList.add("off"),e.search_form.disabled=!1}let l={},c=null;const d=e.search_form.querySelector(".search-input"),u=e.search_form.querySelector(".search-info"),p=async()=>{u.innerHTML=c?`<em>Ricerca per</em><br>${c.type}: <strong>${c.value}</strong>`:"";const t=document.querySelector(".search-options input:checked")?.value??null;await o({...l,orderBy:t}),e.spinner_wrapper.classList.add("off"),e.search_form.disabled=!1,e.orderByBtnsFset.disabled=!1,e.searchFieldsFset.disabled=!1,Array.from(e.filterBtnsFset.querySelectorAll('input[type="radio"]'),(e=>e.checked=!1))},m=async e=>{l=e?{}:{q:d.value.trim()},c=null,e&&d.focus({focusVisible:!0}),await p()};e.search_form.querySelector(".search-btn").addEventListener("click",(()=>{m()}),!1),d.addEventListener("keydown",(e=>{"Enter"===e.code&&m()}),!1),e.search_form.querySelector(".reset-btn").addEventListener("click",(()=>{d.value="",e.result_wrapper.innerHTML="",e.search_form.querySelector('[type="radio"]:first-of-type').checked=!0,m(!0)}),!1),e.result_wrapper.addEventListener("click",(e=>{"reset-filter"===e.target.id&&p()}),!1),e.orderByBtnsFset.addEventListener("click",(e=>{e.target.classList.contains("orderBy-btn")&&(document.getElementById(e.target.getAttribute("for")).checked=!0,p())}),!1),e.filterBtnsFset.addEventListener("click",(t=>{if(t.target.classList.contains("filter-btn")){const a=document.getElementById(t.target.getAttribute("for"));a.checked=!0,function(t){e.search_form.disabled=!0,e.spinner_wrapper.classList.remove("off"),e.observer_element?.remove(),e.result_wrapper.innerHTML="";const a=new URL(`./get-list.php?l=${t}`,location.href).toString();(async()=>{const e=await fetch(a);return await e.json()})().then((a=>{e.result_wrapper.innerHTML='<p class="text-center mt-1"><button class="btn btn-outline" type="button" id="reset-filter">Annulla</button></p><ul class="list">'+a.map((e=>`<li role="button" data-${t}-id="${e.id}">${e.name}</li>`)).join("")+"</ul>",e.spinner_wrapper.classList.add("off"),e.search_form.disabled=!1,e.orderByBtnsFset.disabled=!0,e.searchFieldsFset.disabled=!0})).catch((e=>{console.error(a),console.error(e),alert("Si è verificato un errore (getList)")}))}(a.value)}}),!1),e.result_wrapper.addEventListener("click",(e=>{if(e.target.hasAttribute("data-author-id")&&(document.getElementById("orderBy-year").click(),c={type:"autore",value:e.target.innerText},l={authorId:+e.target.dataset.authorId},d.value="",p()),e.target.closest("[data-serie-id]")){const t=e.target.closest("[data-serie-id]");document.getElementById("orderBy-serie").click(),c={type:"serie",value:t.closest("[data-serie-id]").querySelector("span").innerText},l={serieId:+t.dataset.serieId},d.value="",p()}if(e.target.hasAttribute("data-tag-id")&&(c={type:"tag",value:e.target.innerText},l={tagId:+e.target.dataset.tagId},d.value="",p()),e.target.hasAttribute("data-scaffale-id")&&(document.getElementById("orderBy-serie").click(),c={type:"scaffale",value:e.target.innerText},l={scaffaleId:+e.target.dataset.scaffaleId},d.value="",p()),e.target.closest(".details-trigger")){const t=e.target.closest(".book"),a=t.querySelector(".details");getComputedStyle(a).getPropertyValue("--details-height")||a.style.setProperty("--details-height",function(e){if(!e?.cloneNode)return null;const t=e.cloneNode(!0);Object.assign(t.style,{overflow:"visible",height:"auto",maxHeight:"none",opacity:"0",visibility:"hidden",display:"block"}),e.after(t);const a=t.offsetHeight;return t.remove(),a}(a)+"px"),t.classList.toggle("details-on")}}),!1),p()}();
//# sourceMappingURL=calibre-reader-min.js.map
