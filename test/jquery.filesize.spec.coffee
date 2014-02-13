chai   = require 'chai'
assert = require 'assert'
should = require 'should'

global.document = require("jsdom").jsdom("<html><body></body></html>")
global.window = document.createWindow()
global.$ = global.jQuery = require('jquery').create(window)

initElement = (size) -> $("body").html("<div id='element'>#{size}</div>")

require "../src/jquery.filesize"

describe "File size direct function testing", ->

  it "should throw an error on null", ->
    (() ->
      $.fn.filesize._humanize(null)
    ).should.throw "null did not compute to a valid number to be humanized."

  it "should throw an error on undefined", ->
    (() ->
      $.fn.filesize._humanize(undefined)
    ).should.throw "undefined did not compute to a valid number to be humanized."

  it "should throw an error on negative values", ->
    (() ->
      $.fn.filesize._humanize(-2)
    ).should.throw "-2 did not compute to a valid number to be humanized."

  it "should show abbreviated units", ->
    initElement(2000)
    $.fn.filesize._humanize(2000).should.equal '1.95 kB'

describe "Test filesize plugin with invalid inputs", ->

  it "should show nothing", ->
    initElement('')
    $('#element').filesize()
    $('#element').html().should.equal ''

describe "Test filesize plugin with valid inputs", ->
  it "should show 0 kilobytes", ->
    initElement(0)
    $('#element').filesize()
    $('#element').html().should.equal '0 kB'

  it "should show kilobytes", ->
    initElement(2000)
    $('#element').filesize()
    $('#element').html().should.equal '1.95 kB'

  it "should show kilobytes in non-abbreviated form", ->
    initElement(2000)
    $('#element').filesize({abbr: false})
    $('#element').html().should.equal '1.95 kilobytes'

  it "should show megabytes", ->
    initElement(3000000)
    $('#element').filesize()
    $('#element').html().should.equal '2.86 MB'

  it "should show megabytes in non-abbreviated form", ->
    initElement(3000000)
    $('#element').filesize({abbr: false})
    $('#element').html().should.equal '2.86 megabytes'

  it "should show gigabytes", ->
    initElement(4000000000)
    $('#element').filesize()
    $('#element').html().should.equal '3.73 GB'

  it "should show gigabytes in non-abbrebiated form", ->
    initElement(4000000000)
    $('#element').filesize({abbr: false})
    $('#element').html().should.equal '3.73 gigabytes'

  it "should show terabytes", ->
    initElement(5000000000000)
    $('#element').filesize()
    $('#element').html().should.equal '4.55 TB'

  it "should show terabytes in non-abbreviated form", ->
    initElement(5000000000000)
    $('#element').filesize({abbr: false})
    $('#element').html().should.equal '4.55 terabytes'

  it "should show petabytes", ->
    initElement(6000000000000000)
    $('#element').filesize()
    $('#element').html().should.equal '5.33 PB'

  it "should show petabytes in non-abbreviated form", ->
    initElement(6000000000000000)
    $('#element').filesize({abbr: false})
    $('#element').html().should.equal '5.33 petabytes'
