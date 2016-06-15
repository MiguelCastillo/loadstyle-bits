# loadstyle-bits
bit-imports plugin for loading css into the DOM.

You can configure this module to embed the css in a style tag or to use links.

> Use links for better livereload support.

### Install

```
$ npm install loadstyle-bits --save
```

### Options

* embedded (false) - flag that tells loadstyle-bits to embed css in style DOM nodes.

### Example

``` javascript
var loadstyle = require("loadstyle-bits");

loadstyle({
  path: "http://localhost/path/to/some.css"
});
```

The following example is to embed css in style DOM nodes.

``` javascript
var loadstyle = require("loadstyle-bits");

loadstyle({
  source: "body { color: #938484; }"
}, {
  embedded: true
});
```

### License MIT
