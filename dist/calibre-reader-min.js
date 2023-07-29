/*! Calibre-reader v.0.5.0 - Massimo Cassandro 2023 */
!function(){"use strict";const e=Object.freeze({result_wrapper:document.querySelector(".result-wrapper"),search_form:document.querySelector(".search-form")});var t="0.5.1";function a(e){return function(e){e={id:"",svg_class:"icona",icon_file:"/imgs/icone.svg",title:"",descr:"",aria_hidden:!1,...e},Array.isArray(e.id)||(e.id=[e.id]),1===e.id.length&&(/-line$/.test(e.id)?e.svg_class=`${e.svg_class} line-icon`.trim():/-fill$/.test(e.id)&&(e.svg_class=`${e.svg_class} fill-icon`.trim()));let t=e.id.join("")+Number(Math.round(Math.random()*Date.now())).toString(36),a=[],n=null,s="";e.descr&&(e.aria_hidden=!1,n="d-"+t,a.push(n),s=`<desc id="${n}">${e.descr}</desc>`);let r=null,i="";e.title&&(e.aria_hidden=!1,r="t-"+t,a.push(r),i=`<title id="${r}">${e.title}</title>`);let o=['role="img"'];return e.svg_class&&o.push(`class="${e.svg_class}"`),e.aria_hidden&&o.push('aria-hidden="true"'),a.length&&o.push(`aria-labelledby="${a.join(" ")}"`),`<svg ${o.join(" ")}>\n    ${i}${s}\n    ${e.id.map((t=>{let a="";return e.id.length>1&&(a=t,/-line$/i.test(t)?a+=" line-icon":/-fill$/i.test(t)&&(a+=" fill-icon")),a=a?` class="${a}"`:"",`<use xlink:href="${e.icon_file}#${t}"${a}></use>`})).join("")}</svg>`}({...e,icon_file:"./icons.svg?v="+t})}function n(e){const t=new Date(e);return t.getFullYear()+"-"+String(t.getMonth()+1).padStart(2,"0")+"-"+String(t.getDate()).padStart(2,"0")}let s={},r=null;const i={q:null,orderBy:null,authorId:null,pag:0,limit:20,serieId:null},o=document.querySelector(".spinner-wrapper"),l=new IntersectionObserver((e=>{e[0].isIntersecting&&(s.pag++,d(s))}),{threshold:0,rootMargin:"20px 0px"});async function d(t={}){s={...i,...t},e.search_form.disabled=!0,o.classList.remove("off");const d=await async function(){0===s.pag&&(window.scrollTo(0,0),e.result_wrapper.innerHTML="",r?.remove(),r=null);const t=new URL("./get-data.php",location.href),a=t.searchParams;for(const e in s)s[e]&&a.set(e,s[e]);const n=await fetch(t.toString());return await n.json()}();d.length<s.limit&&r&&(l.unobserve(r),r.remove(),r=null),e.result_wrapper.insertAdjacentHTML("beforeend",d.map((e=>function(e){return e.authors=JSON.parse(e.authors),e.tags=JSON.parse(e.tags),`<article class="book">\n    <div class="book-inner">\n\n      <div class="book-data">\n        <div class="author">\n          ${e.authors.map((e=>`<span role="button" data-author-id="${e.id}">${e.name}</span>`)).join(", ")}\n        </div>\n        <h2 class="title">${e.title}</h2>\n        ${e.serie?`<div class="serie" role="button" data-serie-id="${e.serie_id}"><span>${e.serie}</span> ${e.series_index}</div>`:""}\n        <div class="publisher">\n          ${e.prima_ediz?`<time title="Anno prima edizione">${e.prima_ediz}</time> / `:""}\n          ${e.publisher??"—"} ${e.pub_year&&"0101"!=e.pub_year?` (<time>${e.pub_year}</time>)`:""}\n        </div>\n\n        <div class="info">\n          ${e.amz||e.tags.length?`<span class="tags-wrapper">\n              ${e.amz?'<strong class="mr-1 badge">amz</strong>':""}\n              ${e.tags.length?`${a({id:"tag",svg_class:"icon top-adjust dark"})}\n                <span class="tags">${e.tags.map((e=>`<span role="button" data-tag-id="${e.id}">${e.name}</span>`)).join("/")}</span>`:""}\n            </span>`:""}\n\n          <span class="formats-wrapper">\n            ${a({id:"file",svg_class:"icon top-adjust dark"})}\n            <span class="file-formats">${e.files_format??"&mdash;"}</span>\n          </span>\n        </div>\n\n        <div class="info">\n          ${e.timestamp?`<time class="text-muted text-nowrap" datetime="${n(e.timestamp)}">\n              ${a({id:"calendar-blank",svg_class:"icon top-adjust dark"})}\n              ${new Date(e.timestamp).toLocaleString("it-IT",{year:"2-digit",month:"short",day:"numeric"})}\n            </time>`:""}\n\n          <span>\n            ${a({id:"books",svg_class:"icon top-adjust dark"})}\n            <span class="scaffale">${e.scaffale?`<span role="button" data-scaffale-id="${e.scaffale_id}">${e.scaffale}</span>`:"—"}</span>\n          </span>\n\n          ${e.data_lettura||e.rating?`<span>\n              ${e.data_lettura?a({id:"eyeglasses",svg_class:"icon top-adjust dark"}):""}\n              <time class="text-muted mx-1" datetime=${n(e.data_lettura)}>${e.data_lettura?new Date(e.data_lettura).toLocaleString("it-IT",{year:"2-digit",month:"short",day:"numeric"}):""}</time>\n              <span class="rating">${e.rating?"★".repeat(e.rating):""}</span>\n            </span>`:""}\n        </div>\n      </div>\n\n      <div class="book-utils">\n        <a href="https://www.google.it/search?q=${encodeURIComponent(e.authors.map((e=>e.name)).join(", "))}" target="_blank" rel="noopener noreferrer">\n          ${a({id:"google-logo",svg_class:"icon bold"})}\n        </a>\n\n        <a href="https://www.amazon.it/s?k=${encodeURIComponent(e.authors.map((e=>e.name)).join(", "))}&i=digital-text" target="_blank" rel="noopener noreferrer">\n          ${a({id:"amazon-logo",svg_class:"icon bold"})}\n        </a>\n      </div>\n\n    </div>\n\n    <div class="details-trigger">\n      <button type="button"${e.comment?"":" disabled"}>${a({id:"chat-centered-text",svg_class:"icon"})}</button>\n    </div>\n    ${e.comment?`<section class="details">\n      <div>\n        ${e.comment}\n      </div>\n    </section>`:""}\n  </article>`}(e))).join("")),d.length<s.limit&&e.result_wrapper.insertAdjacentHTML("beforeend",'<div class="bookend"><img src="/favicon.svg" alt=""></div>'),r||d.length!==s.limit||(e.result_wrapper.insertAdjacentHTML("afterend",'<div id="observer" class="p-1"></div>'),r=document.getElementById("observer"),l.observe(r)),o.classList.add("off"),e.search_form.disabled=!1}let c={},u=null;const g=e.search_form.querySelector(".search-input"),p=e.search_form.querySelector(".search-info"),m=()=>{p.innerHTML=u?`<em>Ricerca per</em><br>${u.type}: <strong>${u.value}</strong>`:"";const e=document.querySelector(".search-options input:checked")?.value??null;d({...c,orderBy:e})},h=e=>{c=e?{}:{q:g.value.trim()},u=null,m()};e.search_form.querySelector(".search-btn").addEventListener("click",(()=>{h()}),!1),g.addEventListener("keydown",(e=>{"Enter"===e.code&&h()}),!1),e.search_form.querySelector(".reset-btn").addEventListener("click",(()=>{g.value="",e.result_wrapper.innerHTML="",e.search_form.querySelector('[type="radio"]:first-of-type').checked=!0,h(!0)}),!1),document.querySelector(".search-options")?.addEventListener("click",(e=>{e.target.classList.contains("orderBy-btn")&&(document.getElementById(e.target.getAttribute("for")).checked=!0,m())}),!1),e.result_wrapper.addEventListener("click",(e=>{if(e.target.hasAttribute("data-author-id")&&(document.getElementById("orderBy-year").click(),u={type:"autore",value:e.target.innerText},c={authorId:+e.target.dataset.authorId},g.value="",m()),e.target.closest("[data-serie-id]")){const t=e.target.closest("[data-serie-id]");document.getElementById("orderBy-serie").click(),u={type:"serie",value:t.closest("[data-serie-id]").querySelector("span").innerText},c={serieId:+t.dataset.serieId},g.value="",m()}if(e.target.hasAttribute("data-tag-id")&&(u={type:"tag",value:e.target.innerText},c={tagId:+e.target.dataset.tagId},g.value="",m()),e.target.hasAttribute("data-scaffale-id")&&(document.getElementById("orderBy-serie").click(),u={type:"scaffale",value:e.target.innerText},c={scaffaleId:+e.target.dataset.scaffaleId},g.value="",m()),e.target.closest(".details-trigger")){const t=e.target.closest(".book"),a=t.querySelector(".details");getComputedStyle(a).getPropertyValue("--details-height")||a.style.setProperty("--details-height",function(e){if(!e?.cloneNode)return null;const t=e.cloneNode(!0);Object.assign(t.style,{overflow:"visible",height:"auto",maxHeight:"none",opacity:"0",visibility:"hidden",display:"block"}),e.after(t);const a=t.offsetHeight;return t.remove(),a}(a)+"px"),t.classList.toggle("details-on")}}),!1),m()}();
//# sourceMappingURL=calibre-reader-min.js.map
