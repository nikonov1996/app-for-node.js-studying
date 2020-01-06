const { Router } = require("express");
const Order = require("../models/order");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({ "user.userId": req.user._id }).populate('user.userId');


    res.render("orders", {
      isOrder: true,
      title: "Orders",
      order: order.map(o=>{
        return{
          ...o._doc,
          price: o.items.reduce((total,c)=>{
            return total += c.count * c.items.price
          },0)
        }
      })
    });
  } catch (error) {}
});

router.post("/", async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.itemId").execPopulate();

    const items = user.cart.items.map(i => ({
      count: i.count,
      item: { ...i.itemId._doc }
    }));

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user
      },
      items: items
    });

    await order.save();
    await req.user.clearCart();
    res.redirect("/orders");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
