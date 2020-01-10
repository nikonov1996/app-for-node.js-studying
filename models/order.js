const { Schema, model } = require("mongoose");
const orderSchema = new Schema({
  items: [
    {
      item: {
        type: Object,
        required: true
      },
      count: {
        type: Number,
        required: true
      }
    }
  ],
  user: {
    name: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

orderSchema.method("toClient", function() {
  const order = this.toObject();

  order.id = order._id;
  delete order._id;
  return order;
});

module.exports = model("Order", orderSchema);
