var container = document.getElementById('placeholder');
var destination = location.hash;

var responseProjHandler = function(res) {
  console.log(res);
  // TODO Error checking
  container.innerHTML = res;
  initializeBrick();
};

var responseWorkHandler = function(res) {
  console.log(res);
  // TODO Error checking
  container.innerHTML = res;
};

var responseContHandler = function(res) {
  console.log(res);
  // TODO Error checking
  container.innerHTML = res;
};

var checkHash = function() {
  console.log(destination);
  if (destination == '#work') {
    getMarkup('../markup/work.html', responseWorkHandler);
  }

  else if (destination == '#contact') {
    getMarkup('../markup/contact.html', responseContHandler);
  }

  else {
    getMarkup('../markup/projects.html', responseProjHandler);
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
  console.log(instance);
}

function getMarkup(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      callback(xmlHttp.responseText);
    }
  }
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}


window.onhashchange = checkHash;

(function() {
  checkHash();
})();
