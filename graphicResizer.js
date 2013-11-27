/*!
graphicResizer v0.0.1 (https://github.com/okize)
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
      easing: {
        expand: 'easeInCubic',
        collapse: 'easeOutCubic'
      },
      toggleHtml: '<span class="embiggen"><span class="icon"></span></span>',
      callback: function() {}
    };
    Resizer = (function() {
      function Resizer(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.el = $(this.element);
        this.init();
      }

      Resizer.prototype.init = function() {
        var toggle, trigger,
          _this = this;
        trigger = this.el.find('.toggleSize');
        toggle = $(this.options.toggleHtml);
        if (this.options.showToggle) {
          trigger.prepend(toggle);
        }
        return trigger.on(this.options.mouseEvent, function(e) {
          e.preventDefault();
          if (_this.el.data('state') === 'expanded') {
            _this.el.removeClass('figureExpanded').animate({
              width: _this.el.data('origWidth') + 'px'
            }, {
              duration: _this.options.resizeSpeed,
              easing: _this.options.easing.expand
            }, function() {
              return this.options.callback.call(this);
            });
            toggle.toggleClass('embiggen smallify');
            return _this.el.data('state', 'closed');
          } else {
            _this.el.addClass('figureExpanded').animate({
              width: '100%'
            }, {
              duration: _this.options.resizeSpeed,
              easing: _this.options.easing.collapse
            }, function() {
              return this.options.callback.call(this);
            });
            toggle.toggleClass('embiggen smallify');
            _this.el.data('state', 'expanded');
            return _this.el.data('origWidth', _this.el.width());
          }
        });
      };

      Resizer.prototype.expand = function() {};

      Resizer.prototype.collapse = function() {};

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
