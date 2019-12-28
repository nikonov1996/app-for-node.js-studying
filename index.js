const express = require("express");
const path = require("path");
const fs = require("fs");
const handlebars = require("express-handlebars");
const homeRoutes = require("./routes/home");
const aboutRoutes = require("./routes/about");
const itemsRoutes = require("./routes/items");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");

const app = express();
const hbs = handlebars.create({
  defaultLayout: "main",
  extname: "hbs"
});

//Configurations:
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

//Get files from directories:
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));
app.use("/", homeRoutes);
app.use("/about", aboutRoutes);
app.use("/add", addRoutes);
app.use("/items", itemsRoutes);
app.use("/card", cardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
