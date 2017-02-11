var Record = function(artist, title, price) {
  this.artist = artist;
  this.title = title;
  this.price = price;
};

Record.prototype.double = function() {
  var newPrice = 0;
  newPrice = this.price * 2;
  this.price = newPrice.toFixed(2);
};

module.exports = Record;