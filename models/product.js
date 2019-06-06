const db = require('../util/database')
const Cart = require('./cart');

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(`INSERT INTO products (title, price, description, imageUrl)
    VALUES(?, ?, ?, ?)`, [this.title, this.price, this.description, this.imageUrl]);
  }

  static deleteById(id) {
    return db.execute(`UPDATE products SET Status = 0 WHERE id = "${id}"`)
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products WHERE Status = 1')
  }

  static findById(id) {
    return db.execute(`SELECT * FROM products WHERE products.id = ?`, [id])
  }

}
