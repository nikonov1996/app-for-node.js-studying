const { Router } = require("express");
const Item = require("../models/item");
const router = Router();

router.get("/", (req, res) => {
  res.render("add", {
    title: "Add items",
    isAdd: true
  });
});

router.post("/", async (req, res) => {
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
