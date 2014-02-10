webp-detect
===========

What it is
----------

JavaScript code that detects WebP support and makes it easier to efficiently fall-back to .png in browsers that don't support it.

Setup
-----

Initialise webp-detect when your page is ready:
```javascript
$(document).ready(function () {
  WebpDetect.init();
});
```

How to use
----------

The code checks whether the browser supports the following WebP features:
* lossy
* lossless
* alpha
* animation

Classes will be added to the page's `html` element to indicate what's supported. In the example below, lossy and lossless images are supported but alpha and animation are not:

```html
<html class="webp-lossy webp-lossless no-webp-alpha no-webp-animation">
  ...
```

This means that if you're setting image URLs via styling, you can use the classes to switch between a .webp and its fallback:

```scss
// Example SASS
.lolcat {
  width: 100%;
  .web-lossless {
    background: url('img/cat.webp');
  }
  .no-webp-lossless {
    background: url('img/cat.png');
  }
}
```

For `img` tags where you have a .webp and a .png to fall-back to, you can use the alternative attributes:
```html
<!-- Original markup -->
<img webp-animation-src="img/dog.webp" />
````

The markup will then be changed by webp-detect as follows:

````html
<!-- When animated WebP is supported -->
<img src="img/dog.webp" />
```

````html
<!-- Fall-back to .png equivalent when animated WebP is NOT supported -->
<img src="img/dog.png" />
```
