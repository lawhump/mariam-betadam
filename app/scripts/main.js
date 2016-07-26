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

var secondRow = document.querySelectorAll('.project')[3];
var thirdRow = document.querySelectorAll('.project')[8];
var secondRowThreshhold = secondRow.scrollHeight - secondRow.clientHeight + 10;
var thirdRowThreshhold = thirdRow.scrollHeight - thirdRow.clientHeight + 10;

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

  api.goHome = function() {
    placeholder.classList.remove('active');
    placeholder.setAttribute('hidden', '');
    landing.removeAttribute('hidden', '');

    document.querySelector('nav .active').classList.remove('active');
    document.querySelector('nav .about').classList.add('active');
  };

  api.responseHandler = function(res) {
    window.scrollTo(0,0);
    placeholder.removeAttribute('hidden');
    if (placeholder.classList.contains('active')) {
      console.log('contains active');
      placeholder.classList.remove('active');

      window.setTimeout(function() {
        placeholder.classList.add('active');
        placeholder.innerHTML = res;
      }, 400);
    }

    else {
      window.setTimeout(function() {
        placeholder.classList.add('active');
        placeholder.innerHTML = res;
      }, 100);
    }
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
      var active = document.querySelector('nav .active');
      if (api.isValidPath()) {
        var path = 'markup' + api.destination.split('#')[1] + '.html';
        api.getMarkup(path, api.responseHandler);
        active.classList.remove('active');
        document.querySelector('.dropdown-wrapper').classList.add('active');
      }

      else {
        window.location.href = window.location.host + window.location.pathname;
        history.pushState("", document.title, window.location.pathname);
      }
    }

    else {
      api.goHome();
    }
  };

  return api;
})();

(function() {
  var app = init;
  app.route();

  window.onhashchange = app.route;
})();
