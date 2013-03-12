/*!
graphicResizer v0.0.1 (http://okize.github.com/)
Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
*/


(function() {

  (function(factory) {
    if (typeof define === 'function' && define.amd) {
      return define(['jquery'], factory);
    } else {
      return factory(jQuery);
    }
  })(function($) {
    'use strict';
    var Resizer, defaults, pluginName;
    pluginName = 'graphicResizer';
    defaults = {
      showToggle: true,
      resizeSpeed: 500,
      mouseEvent: 'click',
      callback: function() {}
    };
    Resizer = (function() {

      function Resizer(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.$el = $(this.element);
        this.init();
      }

      Resizer.prototype.init = function() {
        var o, self, thisImg, toggle, trigger;
        self = this;
        o = this.options;
        trigger = this.$el.find('.toggleSize');
        toggle = $('<span class="embiggen"><span class="icon"></span></span>');
        thisImg = void 0;
        if (o.showToggle) {
          trigger.prepend(toggle);
        }
        return trigger.on(o.mouseEvent, function(e) {
          e.preventDefault();
          thisImg = $(this);
          if (thisImg.data('state') === 'expanded') {
            self.$el.removeClass('figureExpanded').animate({
              width: thisImg.data('origWidth') + 'px',
              duration: o.resizeSpeed,
              easing: 'easeInCubic'
            }, function() {}, o.callback.call(this));
            toggle.toggleClass('embiggen smallify');
            return thisImg.data('state', 'closed');
          } else {
            self.$el.addClass('figureExpanded').animate({
              width: '100%',
              duration: o.resizeSpeed,
              easing: 'easeOutCubic'
            }, function() {}, o.callback.call(this));
            toggle.toggleClass('embiggen smallify');
            thisImg.data('state', 'expanded');
            return thisImg.data('origWidth', thisImg.width());
          }
        });
      };

      return Resizer;

    })();
    $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, 'plugin_#{pluginName}')) {
          $.data(this, 'plugin_#{pluginName}', new Resizer(this, options));
        }
      });
    };
  });

}).call(this);
