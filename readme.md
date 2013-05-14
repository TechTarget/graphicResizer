 microsite component

* Options:






# graphicResizer

## Summary

jQuery plugin that provides in-content resizing of graphics.

## Options

Option | Description
--- | ---
showToggle | boolean; will show the enlarge/close toggle link & icon
resizeSpeed | integer; speed in ms that the graphic will grow/shrink
mouseEvent | string; which mouse event will trigger the enlarging of the image ***only supports 'click' for now***
callback | function; optional function that will trigger when the image is done resizing (in either direction)

## The Markup

The markup for this component is in graphicResizer.jade.

## Implementing

###Jade

When using Jade, make sure the index.jade file has the include that references your graphicResizer.jade file. For the navigation list, the text is being created from the H2 within contentItem.

```jade
include graphicResizer
```
###CSS

Make sure to add the .css that is generated from the .scss file to the stylesheet that is associated with your website.

###JavaScript

Make sure to add the minified version of graphicResizer.js to the javascript file that is already associated with your website.

The example below shows the options that can be modified. Copy this function from the example/test.js file for the component that you're adding to the site.

```javascript
$('.graphicResizer').graphicResizer({
    showToggle: true,
    resizeSpeed: 600,
    mouseEvent: 'click'
  });
  ```

## CSS

The CSS for this component is generated from Sass. The stylesheet can be modified to adjust the size of the carousel so that it fits within the left or right column. By default it is set to fit within the full width div.

## Compatible With:
Chrome, FF, IE7+, Opera, Safari

#### Note

* the size of each image is controlled by a class name (.figThumb, .figSmall, .figMedium, .figLarge, .figFull) in the css.