module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
  
    this.add = function (item, id) {
      let storedItem = this.items[id];
      if (!storedItem) {
        storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
      }
      storedItem.qty++;
      storedItem.price = storedItem.item.price * storedItem.qty;
      this.totalQty++;
      this.totalPrice += storedItem.item.price;
    };
  
    this.reduceByOne = function (id) {
      this.items[id].qty--;
      this.items[id].price -= this.items[id].item.price;
      this.totalQty--;
      this.totalPrice -= this.items[id].item.price;
  
      if (this.items[id].qty <= 0) {
        delete this.items[id];
      }
    };
  
    this.removeItem = function (id) {
      this.totalQty -= this.items[id].qty;
      this.totalPrice -= this.items[id].price;
      delete this.items[id];
    };
  
    this.generateArray = function () {
      const arr = [];
      for (let id in this.items) {
        arr.push(this.items[id]);
      }
      return arr;
    };
    
    this.changeQty = (item, id, qty) => {
      const itemQty = qty ? Number(qty) : 1;
      var storeItem = this.items[id];
      if (!storeItem) {
        storeItem = this.items[id] = { item: item, qty: 0, price: 0, images: '' };
        this.numItems++;
      }
      let oldQty = storeItem.qty;
      storeItem.qty = itemQty;
      storeItem.price = storeItem.item.price * storeItem.qty;
      storeItem.images = storeItem.item.images[0];
      this.totalQty += itemQty - oldQty;
      this.totalPrice += storeItem.price - storeItem.item.price * oldQty;
    };
};