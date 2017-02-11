var Record = require('./record');
var Customer = require('./customer');

var Store = function(name, city) {
  this.name = name;
  this.city = city;
  this.inventory = [];
  this.balance = 100;
  this.customers =[];
};

Store.prototype.buyRecord = function(record) {
  var newRecord = new Record("","",0);
  
  if (record.price <= this.balance) {
    
    newRecord.artist = record.artist;
    newRecord.title = record.title;
    newRecord.price = record.price;
    
    this.inventory.push(newRecord);
    this.balance -= record.price;
    var newBalance = this.balance;
  }
  else {
    return "Not enough funds to buy the record!"
  }
  this.balance = newBalance.toFixed(2);
  newRecord.double();
};

Store.prototype.listInventory = function() {
  var listedInventory = "";
  for (var song of this.inventory) {
    listedInventory += "Artist: " + song.artist + "\nTitle: " + song.title + "\nPrice: " + song.price + "\n";
  }
  return listedInventory;
};

Store.prototype.sellRecord = function(customer, artist, title) {
  /////////////// SONG CHECK ////////////////////////////////////
  if (this.inventory.length > 0) {
    for (var song of this.inventory) {
      if (song.title === title && song.artist === artist) {
        //////////////// CUSTOMER CHECK /////////////////////////
        if(this.customers.length> 0) {
          for (var each of this.customers) {
            if (each === customer) {
              var songPrice = Number(song.price);
              if (customer.cash >= songPrice) {
                /////// PAYMENT //////////////////////
                customer.buyRecord(song);
                ////// BALANCE INCREASE //////////////
                var newBalance = Number(this.balance);
                newBalance += songPrice;
                this.balance = newBalance.toFixed(2);
                ///// RECORD REMOVAL /////////////////
                var indexOfSong = this.inventory.indexOf(song);
                this.inventory.splice(indexOfSong, 1);
                return song;
              }
            }
            else {
              return "No such customer";
            }
          }
        }
        else {
          return "No customer";
        }
      }
      else {
        return "There is no record like this in our store!";
      }
    }
  }
  else {
    return "There is no record like this in our store!";
  }
};

Store.prototype.valueOfInventory = function() {
  var inventoryValue = 0;
  for (var song of this.inventory) {
    inventoryValue += Number(song.price);
  }
  return inventoryValue;
}

Store.prototype.financialReport = function() {
  var report = "";
  var reportedBalance = this.balance.toString();
  var inventoryValue = this.valueOfInventory();
  var reportedInventoryValue = inventoryValue.toString();
  report = "Store balance: " + reportedBalance + "\nValue of inventory: " + reportedInventoryValue;
  return report; 
};

Store.prototype.addCustomer = function(customer) {
  this.customers.push(customer);
};

module.exports = Store;