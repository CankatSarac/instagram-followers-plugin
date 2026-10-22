const api=globalThis.browser||chrome;
document.querySelector('#open').addEventListener('click',()=>api.tabs.create({url:api.runtime.getURL('release/import.html')}));
