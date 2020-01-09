const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const session = require("express-session");
const MongoStore = require('connect-mongodb-session')(session)
const homeRoutes = require("./routes/home");
const aboutRoutes = require("./routes/about");
const itemsRoutes = require("./routes/items");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const ordersRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");
const User = require("./models/user");
const varMiddleware = require("./middleware/variables");

const MONGODB_qa_PASSWORD = "VsBvx6Bc3CiXeiIU";
const MONGODB_URI = `mongodb+srv://qa:${MONGODB_qa_PASSWORD}@cluster0-yemnw.mongodb.net/data`;

const app = express();
const hbs = handlebars.create({
  defaultLayout: "main",
  extname: "hbs"
});
const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI
})

//Configurations:
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

//Get files from directories:
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: false,
    store
  })
);
app.use(varMiddleware);

app.use("/", homeRoutes);
app.use("/about", aboutRoutes);
app.use("/add", addRoutes);
app.use("/items", itemsRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

  /*  const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: "nva.1996@yandex.ru",
        name: "Vladislav Nikonov",
        cart: { items: [] }
      });
      await user.save();
    } 
*/
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
}

start();
