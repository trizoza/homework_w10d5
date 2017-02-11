
var Customer = function(name, cash) {
  this.name = name;
  this.cash = cash;
  this.collection = [];
};

Customer.prototype = {
  buyRecord: function(record) {
    if (record.price <= this.cash) {
      ///// BALANCE INCREASE //////////////
      var newCash = Number(this.cash);
      var recordPrice = Number(record.price);
      newCash -= recordPrice;
      this.cash = newCash.toFixed(2);
      ///// RECORD AQUISITION ///////////////
      this.collection.push(record);
    }
    else {
      return "Insufficient funds"
    }
  },

  sellRecord: function(artist, title) {
    if (this.collection.length > 0) {
      for (var song of this.collection) {
        if (song.title === title && song.artist === artist) {
          ////// CASH INCREASE //////////////
          var newCash = Number(this.cash);
          var songPrice = Number(song.price);
          newCash += songPrice;
          this.cash = newCash.toFixed(2);
          ///// RECORD REMOVAL /////////////////
          var indexOfSong = this.collection.indexOf(song);
          this.collection.splice(indexOfSong, 1);
          return song;
        }
        else {
          return "There is no record like this in your collection!"
        }
      }
    }
    else {
      return "There is no record like this in your collection!"
    }
  }

};

module.exports = Customer;