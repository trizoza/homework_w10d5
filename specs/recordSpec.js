var assert = require('assert');
var Record = require('../record');

describe('Record related', function() {
  var regulate;

  beforeEach('Setup', function() {
    regulate = new Record("Warren G & Nate Dogg", "Regulate", 9.99);
  });


  context('Record properties', function() {
    it('can have title', function() {
      assert.equal('Regulate', regulate.title);
    });

    it('can have artist', function() {
      assert.equal("Warren G & Nate Dogg", regulate.artist);
    });

    it('can have price', function() {
      assert.equal(9.99, regulate.price);
    });

  });

  context('Record methods', function() {
    it('can double its price', function() {
      regulate.double();
      assert.equal(19.98, regulate.price);
    });

  })

});