'use strict';

var container = document.getElementById('placeholder');
var destination = location.hash;

var fadeContentIn = function() {
  container.firstChild.className += ' fade-in';
}

var responseProjsHandler = function(res) {
  // TODO Error checking
  container.innerHTML = res;
  initializeBrick();
  fadeContentIn();
};

var responseProjHandler = function(res) {
  // TODO Error checking
  container.innerHTML = res;
  fadeContentIn();
};

var responseWorkHandler = function(res) {
  console.log(res);
  // TODO Error checking
  container.innerHTML = res;
  fadeContentIn();
};

var responseContHandler = function(res) {
  console.log(res);
  // TODO Error checking
  container.innerHTML = res;
  fadeContentIn();
};

var route = function() {
  console.log(destination);
  if (destination == '#work') {
    getMarkup('../markup/work.html', responseWorkHandler);
  }

  else if (destination == '#contact') {
    getMarkup('../markup/contact.html', responseContHandler);
  }

  else if (destination.includes('project')) {
    getMarkup('../markup/project.html', responseProjHandler);
  }

  else {
    getMarkup('../markup/projects.html', responseProjsHandler);
  }
};


function initializeBrick() {
  // create an instance
  var instance = Bricks({
    container: '.projects',
    packed: 'data-packed',
    sizes: [{columns: 3, gutter: 25 }]
  });

  instance.pack();
  document.querySelector('.projects').addEventListener('click', clickHandler);
  console.log(instance);
}

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
  if(e.target && e.target.nodeName == 'DIV') {
		// List item found!  Output the ID!
    console.log(e.target.dataset.projectNumber);
    document.querySelector('.projects').className += 'fade-out';
    window.location.hash = '#project/' + e.target.dataset.projectNumber;
    destination = location.hash;
	}
}

window.onhashchange = route;

(function() {
  route();
})();
