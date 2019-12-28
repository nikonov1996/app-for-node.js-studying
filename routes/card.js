const { Router } = require("express");
const router = Router();
const Card = require("../models/card");
const Item = require("../models/item");

router.post("/add", async (req, res) => {
  const item = await Item.getById(req.body.id);
  await Card.add(item);
  res.redirect("/card");
});

router.delete("/remove/:id", async (req, res) => {
  const card = await Card.remove(req.params.id);
  res.status(200).json(card);
});

router.get("/", async (req, res) => {
  const card = await Card.fetch();
  res.render("card", {
    title: "Card",
    isCard: true,
    items: card.items,
    price: card.price
  });
});


module.exports = router;
