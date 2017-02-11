var assert = require('assert');
var Customer = require('../customer');
var Record = require('../record');

describe('Customer related', function() {
  var customer;
  var regulate;
  var nobodyDoesItBetter;

  beforeEach('Setup', function() {
    customer = new Customer("Peter", 50);
    regulate = new Record("Warren G & Nate Dogg", "Regulate", 9.99);
    nobodyDoesItBetter = new Record("Warren G & Nate Dogg", "Nobody Does It Better", 9.99);
  })

  context('Customer properties', function() {
    it('can have name', function() {
      assert.equal("Peter", customer.name);
    });

    it('can have cash', function() {
      assert.equal(50, customer.cash);
    });

    it('can have collection', function() {
      assert.deepEqual([], customer.collection);
    });

  });

  context('Customer methods', function() {
    it('can buy record', function() {
      customer.buyRecord(regulate);
      assert.equal(40.01, customer.cash);
    });

    it('cannot buy record', function() {
      customer.cash = 5;
      assert.equal("Insufficient funds", customer.buyRecord(regulate));
    });

    it('can sell record', function() {
      customer.buyRecord(regulate);
      customer.sellRecord("Warren G & Nate Dogg", "Regulate");
      assert.equal(50, customer.cash);
    });
  
    it('can not sell record', function() {
      assert.equal("There is no record like this in your collection!", customer.sellRecord("Warren G & Nate Dogg", "Nobody Does It Better"));
    });

  });

});