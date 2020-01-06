const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const homeRoutes = require("./routes/home");
const aboutRoutes = require("./routes/about");
const itemsRoutes = require("./routes/items");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const ordersRoutes = require('./routes/orders')
const User = require("./models/user");

const app = express();
const hbs = handlebars.create({
  defaultLayout: "main",
  extname: "hbs"
});

//Configurations:
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async(req,res,next)=>{
  try {
    const user = await User.findById('5e09b36b106a94048cdf5bd4')
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
  }
  
})

//Get files from directories:
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/", homeRoutes);
app.use("/about", aboutRoutes);
app.use("/add", addRoutes);
app.use("/items", itemsRoutes);
app.use("/card", cardRoutes);
app.use('/orders', ordersRoutes)

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const password = "Gj1mGr9iLgvlYDk4";
    const dbUrl = `mongodb+srv://qa:${password}@cluster0-yemnw.mongodb.net/data`;
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: "nva.1996@yandex.ru",
        name: "Vladislav Nikonov",
        cart: { items: [] }
      });
      await user.save();
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
}

start();
