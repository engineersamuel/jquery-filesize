# Usage

#### To use the filesize API simply init the filesize function on the selector of choice, for ex.

$("#element").filesize()

#### If you prefer to apply to a broader selector

  $(".fs").filesize()

#### Examples

* 1999 becomes 1.95 kB
* 5000000 becomes 488.28 kB
* 6000000000 becomes 5.59 GB

See *demo/index.html* for more examples.

#### Ember

To use as a Helper in Ember:

* bower install jquery-filesize
* Add the script in the html
* Add a helper in Ember

  Ember.Handlebars.helper 'bytes', (value, options) ->
    humanReadable = $.fn.filesize._humanize(Handlebars.Utils.escapeExpression(value), {abbr: true})
      return new Handlebars.SafeString('<span>' + humanReadable + '</span>')

# Contributing
* fork the repo
* npm install
* grunt (which tests and packages)
