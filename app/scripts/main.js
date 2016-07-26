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

function goToTop() {
  window.scrollTo(0,0);
}

// var last_known_scroll_position = 0;
// var ticking = false;
//
// function checkThreshhold(scrollPos) {
//   // do something with the scroll position
//   // console.log("scroll pos: " + scrollPos);
//   // console.log("second row threshhold: " + secondRowThreshhold);
//   if (scrollPos>secondRowThreshhold) {
//     if (scrollPos>thirdRowThreshhold) {
//       console.log("Show second and third row");
//     }
//     else {
//       console.log("Show second row");
//     }
//   }
// }

// window.addEventListener('scroll', function(e) {
//   last_known_scroll_position = window.scrollY;
//   if (!ticking) {
//     window.requestAnimationFrame(function() {
//       checkThreshhold(last_known_scroll_position);
//       ticking = false;
//     });
//   }
//   ticking = true;
// });

(function() {
  var app = init;
  app.route();

  window.onhashchange = app.route;
})();
