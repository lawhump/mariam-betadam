'use strict';
var placeholder = document.querySelector('article.project');

var init = (function () {
  var api = {};

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
  };

  api.isValid = function(path) {
    // TODO
    return true;
  };

  api.route = function() {
    var destination = location.hash;

    if (api.isValid(destination)) {
      var path = 'markup' + destination.split('#')[1] + '.html';
      console.log(path);
      api.getMarkup(path, api.responseHandler);
    }

    else {
      api.getMarkup('/index.html', api.responseHandler);
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
