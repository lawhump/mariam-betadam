'use strict';
var landing = document.querySelector('.landing');
var placeholder = document.querySelector('article.project');

var validPaths = [
                    "#/neutral",
                    "#/multiplex-monograph",
                    "#/8-to-create",
                    "#/no-strings-attached",
                    "#/cahoot",
                    "#/menace-ultimate-frisbee",
                    "#/louie",
                    "#/bikenet",
                    "#/bonfires-at-ocretyre"
                  ];

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
    placeholder.removeAttribute('hidden');
    window.setTimeout(function() {
      placeholder.classList.add('active');
    }, 100);
    landing.setAttribute('hidden', '');
  };

  api.isValidPath = function() {
    var path = api.destination;
    if (path.indexOf('#') < 0) {
      api.destination = '#' + api.destination;
    }

    if (validPaths.indexOf(path) >= 0) {
      return true;
    }

    return false;
  };

  api.route = function() {
    api.destination = location.hash;

    if (api.destination !== '') {
      if (api.isValidPath()) {
        var path = 'markup' + api.destination.split('#')[1] + '.html';
        api.getMarkup(path, api.responseHandler);
      }

      else {
        window.location.href = window.location.host + window.location.pathname;
        history.pushState("", document.title, window.location.pathname);
      }
    }

    else {
      placeholder.classList.remove('active');
      placeholder.setAttribute('hidden', '');
      landing.removeAttribute('hidden', '');
    }
  };

  return api;
})();

(function() {
  var app = init;
  app.route();

  window.onhashchange = app.route;
})();
