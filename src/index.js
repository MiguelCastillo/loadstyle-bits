function attachToDOM(source) {
  var head = document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = source;
  head.appendChild(style);
}

function loadAsLink(path) {
  var head = document.getElementsByTagName('head')[0];
  var link = document.createElement('link');
  link.setAttribute('type', 'text/css');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', path);
  head.appendChild(link);
}

function loadStyle(data, options) {
  options = options || {};

  if (options.embedded) {
    attachToDOM(data.source);
  }
  else {
    loadAsLink(data.path);
  }

  return {
    exports: data.source
  };
}

loadStyle.configure = function(options) {
  return function(data) {
    loadStyle(data, options);
  };
};

module.exports = loadStyle;
