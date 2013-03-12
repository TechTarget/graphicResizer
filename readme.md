graphicResizer microsite component

* Plugin: Graphic Resizer
* Version: 0.0.1 (April 4 2011)
* Description: provides in-content resizing of graphics; the size of each image is controlled by a class name (.figThumb, .figSmall, .figMedium, .figLarge, .figFull) in the css
* Options:
  * showToggle: boolean; will show the enlarge/close toggle link & icon
  * resizeSpeed: integer; speed in ms that the graphic will grow/shrink
  * mouseEvent: string; which mouse event will trigger the enlarging of the image ***NOTE: only support for 'click' right now***
  * callback: function; optional function that will trigger when the image is done resizing (in either direction)
* Dependencies: jQuery Easing plugin