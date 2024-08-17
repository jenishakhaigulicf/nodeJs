// const products = []

const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "products.json");
module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    // products.push(this);
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        if (fileContent.length !== 0) {
          products = JSON.parse(fileContent);
        }
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.error("err", err);
      });
    });
  }

  static fetchAll(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return cb([]);
      }
      if (fileContent.length === 0) {
        return cb([]);
      }
      return cb(JSON.parse(fileContent));
    });
  }
};
