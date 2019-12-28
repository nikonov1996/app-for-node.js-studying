const {Router} = require('express');
const Item = require('../models/item');
const router = Router();

router.get("/", (req,res)=>{
  res.render('add',{
    title: "Add items",
    isAdd: true
  });
})

router.post('/', async(req, res)=>{
  console.log(req.body);
  const item = new Item(
    req.body.title,
    req.body.price,
    req.body.img
    );
  
    await item.save();

  res.redirect('/items');
})

module.exports = router;