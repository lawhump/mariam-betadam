'use strict';
var landing = document.querySelector('.landing');
var placeholder = document.querySelector('article.project');

var init = (function () {
  var api = {};

  api.destination = location.hash;
  api.getMarkup = function(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        callback(xmlHttp.responseText);
      }
    }
    xmlHttp.open('GET', url, true); // true for asynchronous
    xmlHttp.send(null);
  };

  api.responseHandler = function(res) {
    window.scrollTo(0,0);
    placeholder.innerHTML = res;
    placeholder.classList.add('active');
    // landing.setAttribute('hidden', '');
  };

  api.isValidPath = function() {
    var path = api.destination;
    if (!path.includes('#')) {
      api.destination = '#' + api.destination;
    }

    if (path === '#/neutral' ||
        path === '#/multiplex-monograph' ||
        path === '#/8-to-create' ||
        path === '#/no-strings-attached') {
      return true;
    }

    return false;
  };

  api.route = function() {
    api.destination = location.hash;

    if (api.destination !== '') {
      if (api.isValidPath()) {
        var path = 'markup' + api.destination.split('#')[1] + '.html';
        console.log(path);
        api.getMarkup(path, api.responseHandler);

        // Remove hash from url
        // var hash = window.location.hash.split('#')[1];
        // history.pushState("", document.title, hash);
      }

      else {
        window.location.href = window.location.host + window.location.pathname;
        history.pushState("", document.title, window.location.pathname);
      }
    }
  };

  return api;
})();

(function() {
  var app = init;
  app.route();

  window.onhashchange = app.route;
})();
// document.querySelector('.projects').addEventListener('click', clickHandler);
