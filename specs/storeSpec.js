var assert = require('assert');
var Store = require('../store');
var Record = require('../record');
var Customer = require('../customer');

describe('Store related', function() {
  var store;
  var regulate;
  var nobodyDoesItBetter;
  var peter;

  beforeEach('Setup', function() {
    store = new Store("Peter's records", "Zilina");
    regulate = new Record("Warren G & Nate Dogg", "Regulate", 9.99);
    nobodyDoesItBetter = new Record("Warren G & Nate Dogg", "Nobody Does It Better", 9.99);
    peter = new Customer("Peter", 20);
    store.addCustomer(peter);
  });

  context('Store properties', function() {
    it('can have name', function() {
      assert.equal("Peter's records", store.name);
    });

    it('can have city', function() {
      assert.equal("Zilina", store.city);
    });

    it('can have inventory', function() {
      assert.deepEqual([], store.inventory);
    });

    it('can have empty inventory', function() {
      assert.equal(0, store.inventory.length);
    });

    it('can have balance', function() {
      assert.equal(100, store.balance);
    });

    it('can have customers', function() {
      assert.deepEqual(1, store.customers.length);
    });

  });

  context('Store methods', function() {
    it('can buy records', function() {
      store.buyRecord(regulate);
      assert.equal(1, store.inventory.length);
    });

    it('can not buy records', function() {
      store.balance = 5;
      assert.equal("Not enough funds to buy the record!", store.buyRecord(regulate));
    });

    it('can buy records and decrease budget', function() {
      store.buyRecord(nobodyDoesItBetter);
      assert.equal(90.01, store.balance);
    });

    it('can buy record and not double its buy price', function() {
      store.buyRecord(regulate);
      assert.equal(9.99, regulate.price);
    });

    it('can double its price n inventory', function() {
      store.buyRecord(regulate);
      assert.equal(19.98, store.inventory[0].price);
    });

    it('can buy more records', function() {
      store.buyRecord(regulate);
      store.buyRecord(nobodyDoesItBetter);
      assert.equal(2, store.inventory.length);
    });

    it('can list inventory', function() {
      store.buyRecord(regulate);
      store.buyRecord(nobodyDoesItBetter);
      assert.equal("Artist: Warren G & Nate Dogg\nTitle: Regulate\nPrice: 19.98\nArtist: Warren G & Nate Dogg\nTitle: Nobody Does It Better\nPrice: 19.98\n", store.listInventory());
    });

    it('can sell one record and increase balance', function() {
      store.buyRecord(regulate);
      store.sellRecord(peter, "Warren G & Nate Dogg", "Regulate");
      assert.equal(109.99, store.balance);
    });

    it('can sell one record and remove it from inventory', function() {
      store.buyRecord(regulate);
      store.sellRecord(peter, "Warren G & Nate Dogg", "Regulate");
      assert.equal(0, store.inventory.length);
    });

    it('can not sell record', function() {
      assert.equal("There is no record like this in our store!", store.sellRecord(peter, "Warren G & Nate Dogg", "Nobody Does It Better"));
    });

    it('can sell one of more records', function() {
      store.buyRecord(regulate);
      store.buyRecord(nobodyDoesItBetter);
      store.sellRecord(peter, "Warren G & Nate Dogg", "Regulate");
      assert.equal(100, store.balance);
    });

    it('can get value of inventory', function() {
      store.buyRecord(regulate);
      store.buyRecord(nobodyDoesItBetter);
      assert.equal(39.96, store.valueOfInventory());
    });

    it('can get financial report', function() {
      store.buyRecord(regulate);
      store.buyRecord(nobodyDoesItBetter);
      assert.equal("Store balance: 80.02\nValue of inventory: 39.96", store.financialReport());
    });

    it('can get financial report after selling', function() {
      store.buyRecord(regulate);
      store.buyRecord(nobodyDoesItBetter);
      store.sellRecord(peter, "Warren G & Nate Dogg", "Regulate");
      assert.equal("Store balance: 100.00\nValue of inventory: 19.98", store.financialReport());
    });

    it('can add customer', function() {
      assert.equal(1, store.customers.length);
    });

  });

});