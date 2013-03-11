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
      property: true
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
        return true;
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
