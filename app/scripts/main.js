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
                    "#/mehu",
                    "#/drawings",
                    "#/portraits",
                    "#/bonfires-at-ocretyre"
                  ];

var secondRow = document.querySelectorAll('.project')[3];
var thirdRow = document.querySelectorAll('.project')[8];
var secondRowThreshhold = secondRow.scrollHeight - secondRow.clientHeight + 10;
var thirdRowThreshhold = thirdRow.scrollHeight - thirdRow.clientHeight + 10;

/**
 *
 * Created by Borbás Geri on 12/17/13
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
var EPPZScrollTo = {
  /**
   * Helpers.
   */
  documentVerticalScrollPosition: function()
  {
      if (self.pageYOffset) return self.pageYOffset; // Firefox, Chrome, Opera, Safari.
      if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop; // Internet Explorer 6 (standards mode).
      if (document.body.scrollTop) return document.body.scrollTop; // Internet Explorer 6, 7 and 8.
      return 0; // None of the above.
  },

  viewportHeight: function()
  { return (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight; },

  documentHeight: function()
  { return (document.height !== undefined) ? document.height : document.body.offsetHeight; },

  documentMaximumScrollPosition: function()
  { return this.documentHeight() - this.viewportHeight(); },

  elementVerticalClientPositionById: function(id)
  {
      var element = document.getElementById(id);
      var rectangle = element.getBoundingClientRect();
      return rectangle.top;
  },

  /**
   * Animation tick.
   */
  scrollVerticalTickToPosition: function(currentPosition, targetPosition)
  {
      var filter = 0.2;
      var fps = 120;
      var duration = 1250;

      var difference = parseFloat(targetPosition) - parseFloat(currentPosition);

      // Snap, then stop if arrived.
      var arrived = (Math.abs(difference) <= 0.5);
      if (arrived)
      {
          // Apply target.
          scrollTo(0.0, targetPosition);
          return;
      }

      // Filtered position.
      currentPosition = (parseFloat(currentPosition) * (1.0 - filter)) + (parseFloat(targetPosition) * filter);

      // Apply target.
      scrollTo(0.0, Math.round(currentPosition));

      // Schedule next tick.
      setTimeout("EPPZScrollTo.scrollVerticalTickToPosition("+currentPosition+", "+targetPosition+")", (duration / fps));
  },

  /**
   * For public use.
   *
   * @param id The id of the element to scroll to.
   * @param padding Top padding to apply above element.
   */
  scrollVerticalToElementById: function(id, padding)
  {
      var element = document.getElementById(id);
      if (element == null)
      {
          console.warn('Cannot find element with id \''+id+'\'.');
          return;
      }

      var targetPosition = this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - padding;
      var currentPosition = this.documentVerticalScrollPosition();

      // Clamp.
      var maximumScrollPosition = this.documentMaximumScrollPosition();
      if (targetPosition > maximumScrollPosition) targetPosition = maximumScrollPosition;

      // Start animation.
      this.scrollVerticalTickToPosition(currentPosition, targetPosition);
  }
};

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
    // window.scrollTo(0,0);
    placeholder.removeAttribute('hidden');
    if (placeholder.classList.contains('active')) {
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
        EPPZScrollTo.scrollVerticalToElementById('nav', 100);
        window.setTimeout(function() {
          api.getMarkup(path, api.responseHandler);
          active.classList.remove('active');
          document.querySelector('.dropdown-wrapper').classList.add('active');
        }, 400);
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
