'use strict';

var container = document.getElementById('placeholder');
var destination = location.hash;

var fadeContentIn = function() {
  container.firstChild.className += ' fade-in';
}

var responseProjsHandler = function(res) {
  // TODO Error checking
  container.innerHTML = res;
  initializeGrid();
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
  destination = location.hash;
  console.log(destination);
  if (destination == '#work') {
    getMarkup('work.html', responseWorkHandler);
  }

  else if (destination.length == 0) {
    getMarkup('projects.html', responseProjsHandler);
  }

  else if (destination.includes('project')) {
    getMarkup('project.html', responseProjHandler);
  }

  else {
    return;
  }
};


function initializeGrid() {
  // var grid = document.querySelector('.projects');
  // var options = {
  //   itemSelector: '.project',
  //   columnWidth: '.grid-sizer',
  //   isFitWidth: true,
  //   gutter: 10
  // };
  // var msnry = new Masonry(grid, options);

  document.querySelector('.projects').addEventListener('click', clickHandler);
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
    var projectName = e.target.dataset.projectName;
    console.log(projectName);
    document.querySelector('.projects').className += 'fade-out';
    window.location.hash = '#project/' + projectName;
	}
}

window.onhashchange = route;

(function() {
  route();
})();
