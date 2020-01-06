const { Schema, model } = require("mongoose");

const user = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1
        },
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "Item",
          required: true
        }
      }
    ]
  }
});

user.methods.addToCart = function(item) {
  const items = [...this.cart.items];
  const index = items.findIndex(c => {
    return c.itemId.toString() === item._id.toString();
  });
  if (index >= 0) {
    items[index].count = items[index].count + 1;
  } else {
    items.push({
      itemId: item._id,
      count: 1
    });
  }

  //const newCart = { items: items };
  //this.cart = newCart;
  this.cart = { items };
  return this.save();
};

user.methods.removeFromCart = function(id){
  let items = [...this.cart.items]
  const index = items.findIndex(c=> c.itemId.toString() === id.toString())

  if (items[index].count === 1) {
    items = items.filter(c=>c.itemId.toString() !== id.toString())
  } else {
    items[index].count--
  }

  this.cart = {items}
  return this.save()
}

module.exports = model("User", user);
