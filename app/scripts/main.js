'use strict';
var container = document.getElementById('placeholder');
var destination = location.hash;

var init = (function () {
  var api = {};

  api.route = function() {
    destination = location.hash;
    if (destination.includes('project')) {
      var url = window.location.hash.split('project/')[1];
      url = 'markup/' + url + '.html';
      getMarkup(url, responseHandler);
    }

    else {
      getMarkup('markup/projects.html', responseHandler);
    }
  };

  return api;
})();

var fadeContentIn = function() {
  container.firstChild.classList.add('fade-in');
}

var responseHandler = function(res) {
  // TODO Error checking
  container.innerHTML = res;
  fadeContentIn();
};

function getMarkup(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      callback(xmlHttp.responseText);
    }
  }
  xmlHttp.open('GET', url, true); // true for asynchronous
  xmlHttp.send(null);
}

function clickHandler(e) {
  console.log('wtf');
  if(e.target && e.target.nodeName == 'DIV') {
    var projectName = e.target.dataset.projectName;
    console.log(projectName);
    document.querySelector('.projects').classList.add('fade-out');
    window.location.hash = '#project/' + projectName;
	}
}


(function() {
  var app = init;
  app.route();

  window.onhashchange = app.route;
})();

document.querySelector('#placeholder').addEventListener('click', clickHandler);
