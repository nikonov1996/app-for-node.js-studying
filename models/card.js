const path = require("path");
const fs = require("fs");

class Card {
  static async add(item) {
    const card = await Card.fetch();

    const index = card.items.findIndex(c => c.id === item.id);
    const condidate = card.items[index];
    if (condidate) {
      condidate.count++;
      card.items[index] = condidate;
    } else {
      item.count = 1;
      card.items.push(item);
    }

    card.price += +item.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "card.json"),
        JSON.stringify(card),
        err => {
          if (err) {
            reject(err);
          } else {
            resolve(card);
          }
        }
      );
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "card.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }

  static async remove(id) {
    const card = await Card.fetch();

    const index = card.items.findIndex(c => c.id === id);
    const item = card.items[index];

    if (item.count === 1) {
      card.items = card.items.filter(c => c.id !== id);
    } else {
      card.items[index].count--;
    }
    card.price -= item.price;
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "card.json"),
        JSON.stringify(card),
        err => {
          if (err) {
            reject(err);
          } else {
            resolve(card);
          }
        }
      );
    });
  }
}

module.exports = Card;
