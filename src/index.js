function attachToDOM(source) {
  var head = document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = source;
  head.appendChild(style);
}

function loadStyle(moduleMeta /*, options*/) {
  attachToDOM(moduleMeta.source);

  return {
    code: moduleMeta.source
  };
}

loadStyle.configure = function(options) {
  return function(moduleMeta) {
    loadStyle(moduleMeta, options);
  };
};

module.exports = loadStyle;
