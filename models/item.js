const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

itemSchema.method("toClient", function() {
  const item = this.toObject();

  item.id = item._id;
  delete item._id;
  return item;
});

module.exports = model("Item", itemSchema);
