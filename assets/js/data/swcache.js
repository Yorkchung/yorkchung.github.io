const resource = [

  /* --- CSS --- */
  '/yorkchung.github.io/assets/css/style.css',

  /* --- PWA --- */
  '/yorkchung.github.io/app.js',
  '/yorkchung.github.io/sw.js',

  /* --- HTML --- */
  '/yorkchung.github.io/index.html',
  '/yorkchung.github.io/404.html',
  
    '/yorkchung.github.io/categories/',
  
    '/yorkchung.github.io/tags/',
  
    '/yorkchung.github.io/archives/',
  
    '/yorkchung.github.io/about/',
  

  /* --- Favicons & compressed JS --- */
  
  
    '/yorkchung.github.io/assets/img/favicons/android-chrome-192x192.png',
    '/yorkchung.github.io/assets/img/favicons/android-chrome-512x512.png',
    '/yorkchung.github.io/assets/img/favicons/apple-touch-icon.png',
    '/yorkchung.github.io/assets/img/favicons/favicon-16x16.png',
    '/yorkchung.github.io/assets/img/favicons/favicon-32x32.png',
    '/yorkchung.github.io/assets/img/favicons/favicon.ico',
    '/yorkchung.github.io/assets/img/favicons/mstile-150x150.png',
    '/yorkchung.github.io/assets/js/dist/categories.min.js',
    '/yorkchung.github.io/assets/js/dist/commons.min.js',
    '/yorkchung.github.io/assets/js/dist/home.min.js',
    '/yorkchung.github.io/assets/js/dist/misc.min.js',
    '/yorkchung.github.io/assets/js/dist/page.min.js',
    '/yorkchung.github.io/assets/js/dist/post.min.js',
    '/yorkchung.github.io/assets/js/dist/pvreport.min.js'

];

/* The request url with below domain will be cached */
const allowedDomains = [
  

  'localhost:4000',

  
    'raw.githubusercontent.com',
  

  'fonts.gstatic.com',
  'fonts.googleapis.com',
  'cdn.jsdelivr.net',
  'polyfill.io'
];

/* Requests that include the following path will be banned */
const denyUrls = [
  
];

