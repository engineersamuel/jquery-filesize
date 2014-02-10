(function() {
  var assert, chai, initElement, should;

  chai = require('chai');

  assert = require('assert');

  should = require('should');

  global.document = require("jsdom").jsdom("<html><body></body></html>");

  global.window = document.createWindow();

  global.$ = global.jQuery = require('jquery').create(window);

  initElement = function(size) {
    return $("body").html("<div id='element'>" + size + "</div>");
  };

  require("../src/jquery.filesize");

  describe("File size direct function testing", function() {
    it("should throw an error on null", function() {
      return (function() {
        return $.fn.filesize._humanize(null);
      }).should["throw"]("null did not compute to a valid number to be humanized.");
    });
    it("should throw an error on undefined", function() {
      return (function() {
        return $.fn.filesize._humanize(void 0);
      }).should["throw"]("undefined did not compute to a valid number to be humanized.");
    });
    return it("should throw an error on negative values", function() {
      return (function() {
        return $.fn.filesize._humanize(-2);
      }).should["throw"]("-2 did not compute to a valid number to be humanized.");
    });
  });

  describe("Test filesize plugin with invalid inputs", function() {
    return it("should show nothing", function() {
      initElement('');
      $('#element').filesize();
      return $('#element').html().should.equal('');
    });
  });

  describe("Test filesize plugin with valid inputs", function() {
    it("should show 0 kilobytes", function() {
      initElement(0);
      $('#element').filesize();
      return $('#element').html().should.equal('0 kB');
    });
    it("should show kilobytes", function() {
      initElement(2000);
      $('#element').filesize();
      return $('#element').html().should.equal('1.95 kB');
    });
    it("should show kilobytes in non-abbreviated form", function() {
      initElement(2000);
      $('#element').filesize({
        abbr: false
      });
      return $('#element').html().should.equal('1.95 kilobytes');
    });
    it("should show megabytes", function() {
      initElement(3000000);
      $('#element').filesize();
      return $('#element').html().should.equal('2.86 MB');
    });
    it("should show megabytes in non-abbreviated form", function() {
      initElement(3000000);
      $('#element').filesize({
        abbr: false
      });
      return $('#element').html().should.equal('2.86 megabytes');
    });
    it("should show gigabytes", function() {
      initElement(4000000000);
      $('#element').filesize();
      return $('#element').html().should.equal('3.73 GB');
    });
    it("should show gigabytes in non-abbrebiated form", function() {
      initElement(4000000000);
      $('#element').filesize({
        abbr: false
      });
      return $('#element').html().should.equal('3.73 gigabytes');
    });
    it("should show terabytes", function() {
      initElement(5000000000000);
      $('#element').filesize();
      return $('#element').html().should.equal('4.55 TB');
    });
    it("should show terabytes in non-abbreviated form", function() {
      initElement(5000000000000);
      $('#element').filesize({
        abbr: false
      });
      return $('#element').html().should.equal('4.55 terabytes');
    });
    it("should show petabytes", function() {
      initElement(6000000000000000);
      $('#element').filesize();
      return $('#element').html().should.equal('5.33 PB');
    });
    return it("should show petabytes in non-abbreviated form", function() {
      initElement(6000000000000000);
      $('#element').filesize({
        abbr: false
      });
      return $('#element').html().should.equal('5.33 petabytes');
    });
  });

}).call(this);

//# sourceMappingURL=jquery.filesize.spec.js.map
