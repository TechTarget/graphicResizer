###!
graphicResizer v0.0.1 (http://okize.github.com/)
Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
###

((factory) ->

  # use AMD or browser globals to create a jQuery plugin.
  if typeof define is 'function' and define.amd
    define [ 'jquery' ], factory
  else
    factory jQuery

) ($) ->

  'use strict'

  pluginName = 'graphicResizer'

  # default plugin options
  defaults =
    showToggle: true
    resizeSpeed: 500
    mouseEvent: 'click'
    callback: ->

  # plugin constructor
  class Resizer

    constructor: (@element, options) ->
      @options = $.extend({}, defaults, options)
      @_defaults = defaults
      @_name = pluginName
      @$el = $(@element)
      @init()

    # initialize plugin
    init: ->
      self = this
      o = @options
      trigger = @$el.find('.toggleSize')
      toggle = $('<span class="embiggen"><span class="icon"></span></span>')
      thisImg = undefined

      # add in 'enlarge/close' text and icon
      trigger.prepend toggle if o.showToggle

      # mouse event handler
      trigger.on o.mouseEvent, (e) ->

        e.preventDefault()

        thisImg = $(this)

        # when the image is in an expenaded state, shrink it to it's
        # orginal dimensions and switch the className of the toggle button
        # when the image is in a closed state, expand it to 100%
        # of the available width and store it's original dimensions
        if thisImg.data('state') is 'expanded'
          self.$el.removeClass('figureExpanded').animate
            width: thisImg.data('origWidth') + 'px',
            duration: o.resizeSpeed
            easing: 'easeInCubic', ->
            o.callback.call this
          toggle.toggleClass 'embiggen smallify' # it worked! the debigulator worked!
          thisImg.data 'state', 'closed'

        else
          self.$el.addClass('figureExpanded').animate
            width: '100%',
            duration: o.resizeSpeed
            easing: 'easeOutCubic', ->
            o.callback.call this
          toggle.toggleClass 'embiggen smallify' # a noble spirit embiggens the smallest man
          thisImg.data 'state', 'expanded'
          thisImg.data 'origWidth', thisImg.width()

  # lightweight wrapper around the constructor that prevents multiple instantiations
  $.fn[pluginName] = (options) ->
    @each ->
      if !$.data(@, 'plugin_#{pluginName}')
        $.data(@, 'plugin_#{pluginName}', new Resizer(@, options))
      return
  return