/*
 * Plugin: Graphic Resizer
 * Version: 1.1 (April 4 2011)
 * Description: provides in-content resizing of graphics; the size of each image is controlled by a class name (.figThumb, .figSmall, .figMedium, .figLarge, .figFull) in the css
 * Author: Morgan Wigmanich, TechTarget
 * Options:
 *          showToggle: boolean; will show the enlarge/close toggle link & icon
 *          resizeSpeed: integer; speed in ms that the graphic will grow/shrink
 *          mouseEvent: string; which mouse event will trigger the enlarging of the image ***NOTE: only support for 'click' right now***
 *          callback: function; optional function that will trigger when the image is done resizing (in either direction)
 * Dependencies: jQuery Easing plugin
 */
;(function ( $, window, undefined ) {

    'use strict';

    // the default settings
    var pluginName = 'graphicResizer';
    var defaults = {
        showToggle: true,
        resizeSpeed: 500,
        mouseEvent: 'click',
        callback: function () {}
    };

    // plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function () {

        var o = this.options;
        var resizer = $(this.element);
        var trigger = resizer.find('.toggleSize');
        var toggle = $('<span class="embiggen"><span class="icon"></span></span>');
        var thisImg;

        // add in 'enlarge/close' text and icon
        if (o.showToggle) {
            trigger.prepend(toggle);
        }

        // mouse event handler
        trigger.on(o.mouseEvent, function (e) {

            e.preventDefault();

            thisImg = $(this);

            // when the image is in an expenaded state, shrink it to it's orginal dimensions and switch the className of the toggle button
            // when the image is in a closed state, expand it to 100% of the available width and store it's original dimensions
            if (thisImg.data('state') === 'expanded') {
                resizer.removeClass('figureExpanded').animate({
                    width: thisImg.data('origWidth') + 'px'
                }, {
                    duration: o.resizeSpeed,
                    easing: 'easeInCubic'
                }, function () {
                    o.callback.call(this);
                });
                toggle.toggleClass('embiggen smallify'); // it worked! the debigulator worked!
                thisImg.data('state', 'closed');
            } else {
                resizer.addClass('figureExpanded').animate({
                    width: '100%'
                }, {
                    duration: o.resizeSpeed,
                    easing: 'easeOutCubic'
                }, function () {
                    o.callback.call(this);
                });
                toggle.toggleClass('embiggen smallify'); // a noble spirit embiggens the smallest man
                thisImg.data('state', 'expanded');
                thisImg.data('origWidth', thisImg.width());
            }

        });

    };

    // a lightweight plugin wrapper around the constructor preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

}(jQuery, window));