# Templates used: https://gist.github.com/jimeh/909017 and https://github.com/umdjs/umd/blob/master/jqueryPlugin.js
# Consider: https://github.com/miniJs/miniBoilerplate/blob/master/js/pluginName.coffee
((factory) ->
  if typeof define is "function" and define.amd

    # AMD. Register as an anonymous module.
    define ["jquery"], factory
  else

    # Browser globals
    factory jQuery
  return
) ($) ->

  $.fn.extend
    filesize: (options) ->
      self = $.fn.filesize
      opts = $.extend {}, self.default_options, options
      $(this).each (i, el) ->
        self.init el, opts
        #self.log el if opts.log

  $.extend $.fn.filesize,
    # By default abbreviate the units, i.e. kB instead of kilobytes
    default_options:
      abbr: true

    init: (el, opts) ->
      this.humanize el, opts

    humanize: (el, opts) ->
      try
        size = parseInt($(el).html())
        output = ""
        if size?
          output = @_humanize(size, opts)

        # Only set the output if output was determined
        if output?
          $(el).html(output)
      catch err
        undefined # noop

    # Helper function that contains the actual logic, this allows the function to be called independently
    _humanize: (size, opts) ->
      i = Math.floor(Math.log(size) / Math.log(1024))
      if (size is 0) or (parseInt(size) is 0)
        return "0 kB"
      else if isNaN(i) or (not isFinite(size)) or (size is Number.POSITIVE_INFINITY) or (size is Number.NEGATIVE_INFINITY) or (not size?) or (size < 0)
        console.info "Throwing error"
        throw Error("#{size} did not compute to a valid number to be humanized.")
      else
        if opts?.abbr is true
          return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + [
            "B"
            "kB"
            "MB"
            "GB"
            "TB"
            "PB"
          ][i]
        else
          return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + [
            "bytes"
            "kilobytes"
            "megabytes"
            "gigabytes"
            "terabytes"
            "petabytes"
          ][i]

    log: (msg) ->
      console.log msg
