const { Router } = require("express");
const Item = require("../models/item");
const auth = require('../middleware/auth')
const router = Router();

router.get("/", async (req, res) => {
  const items = await Item.find();
  res.render("items", {
    title: "Items",
    isItems: true,
    items
  });
});

router.get("/:id/edit", auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }

  const item = await Item.findById(req.params.id);

  res.render("item-edit", {
    title: `Edit ${item.title}`,
    item
  });
});

router.post("/remove", auth, async (req, res) => {
  try {
    await Item.deleteOne({ _id: req.body.id });
    res.redirect("/items");
  } catch (error) {
    console.error(error);
  }
});

router.post("/edit", auth, async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  await Item.findByIdAndUpdate(id, req.body);
  res.redirect("/items");
});

router.get("/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);

  res.render("item", {
    layout: "empty",
    title: `Item: ${item.title}`,
    item
  });
});

module.exports = router;
