const { Router } = require("express");
const router = Router();
const Item = require("../models/item");
const auth = require('../middleware/auth')

router.post("/add", auth , async (req, res) => {
  const item = await Item.findById(req.body.id);
  await req.user.addToCart(item);
  res.redirect("/items");
});

router.delete("/remove/:id", auth , async (req, res) => {
  await req.user.removeFromCart(req.params.id);
  const user = await req.user.populate("cart.items.itemId").execPopulate();
  const items = mapCartItems(user.cart);
  const cart = {
    items,
    price: computePrice(items)
  };

  res.status(200).json(cart);
});

function mapCartItems(cart) {
  return cart.items.map(c => ({
    ...c.itemId._doc,
    id: c.itemId.id,
    count: c.count
  }));
}

function computePrice(items) {
  return items.reduce((total, item) => {
    return (total += item.price * item.count);
  }, 0);
}

router.get("/", auth , async (req, res) => {
  const user = await req.user.populate("cart.items.itemId").execPopulate();

  const items = mapCartItems(user.cart);

  res.render("card", {
    title: "Card",
    isCard: true,
    items: items,
    price: computePrice(items)
  });
});

module.exports = router;
