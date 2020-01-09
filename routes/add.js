const { Router } = require("express");
const Item = require("../models/item");
const auth = require('../middleware/auth')
const router = Router();

router.get("/", auth , (req, res) => {
  res.render("add", {
    title: "Add items",
    isAdd: true
  });
});

router.post("/", auth , async (req, res) => {
  console.log(req.body);
  const item = new Item({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    userId: req.user
  });

  try {
    await item.save();
    res.redirect("/items");
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
