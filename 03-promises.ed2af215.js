function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},i=t.parcelRequire7bc7;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},t.parcelRequire7bc7=i);var r=i("7Y9D8");function u(e,t){return new Promise(((n,o)=>{const i=Math.random()>.3,r=setTimeout((()=>{clearTimeout(r),i?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}const l=document.querySelector(".form"),s=document.querySelector('input[name="delay"]'),a=document.querySelector('input[name="step"]'),d=document.querySelector('input[name="amount"]'),c=document.querySelector('button[type="submit"]');l.addEventListener("submit",(function(t){t.preventDefault();const n=Number(s.value),o=Number(a.value),i=Number(d.value);for(let t=0;t<i;t++){u(t+1,n+t*o).then((({position:t,delay:n})=>{e(r).Notify.success(`✅ Fulfilled promise ${t} in ${n}ms`)})).catch((({position:t,delay:n})=>{e(r).Notify.failure(`❌ Rejected promise ${t} in ${n}ms`)}))}})),s.setAttribute("min","0"),a.setAttribute("min","0"),d.setAttribute("min","0"),d.addEventListener("input",(function(){c.disabled=this.value<=0}));
//# sourceMappingURL=03-promises.ed2af215.js.map