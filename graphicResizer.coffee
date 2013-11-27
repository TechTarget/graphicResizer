###!
graphicResizer v0.0.1 (https://github.com/okize)
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
    easing: {
      expand: 'easeInCubic',
      collapse: 'easeOutCubic'
    }
    toggleHtml: '<span class="embiggen"><span class="icon"></span></span>'
    callback: ->

  # plugin constructor
  class Resizer

    constructor: (@element, options) ->
      @options = $.extend({}, defaults, options)
      @_defaults = defaults
      @_name = pluginName
      @el = $(@element)
      @init()

    # initialize plugin
    init: ->
      trigger = @el.find('.toggleSize')
      toggle = $(@options.toggleHtml)

      # add in 'enlarge/close' text and icon
      trigger.prepend(toggle) if @options.showToggle

      # mouse event handler
      trigger.on @options.mouseEvent, (e) =>

        e.preventDefault()

        if @el.data('state') is 'expanded'
          @el.removeClass('figureExpanded').animate({
            width: @el.data('origWidth') + 'px'
          },
          {
            duration: @options.resizeSpeed,
            easing: @options.easing.expand
          }, ->
            @options.callback.call this
          )
          # it worked! the debigulator worked!
          toggle.toggleClass 'embiggen smallify'
          @el.data 'state', 'closed'

        else
          @el.addClass('figureExpanded').animate({
            width: '100%'
          },
          {
            duration: @options.resizeSpeed,
            easing: @options.easing.collapse
          }, ->
            @options.callback.call this
          )
          # a noble spirit embiggens the smallest man
          toggle.toggleClass 'embiggen smallify'
          @el.data 'state', 'expanded'
          @el.data 'origWidth', @el.width()

    # when the image is in an expanded state, shrink it to it's
    # original dimensions and switch the className of the toggle button
    expand: ->
      # console.log('expand')

    # when the image is in a closed state, expand it to 100%
    # of the available width and store it's original dimensions
    collapse: ->
      # console.log('collapse')



  # lightweight wrapper around the constructor that prevents multiple instantiations
  $.fn[pluginName] = (options) ->
    @each ->
      if !$.data(@, 'plugin_#{pluginName}')
        $.data(@, 'plugin_#{pluginName}', new Resizer(@, options))
      return
  return