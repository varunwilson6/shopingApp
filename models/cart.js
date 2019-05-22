const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //Fetch the previous cart 
        fs.readFile(p, (err, filecontent) => {
            let cart = {products:[], totalPrice: 0}
            if(!err) {
                cart = JSON.parse(filecontent);
            }
            //Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedproduct;
            //Add new product/ increase quantity
            if(existingProduct) {
                updatedproduct = { ...existingProduct};
                updatedproduct.qty = updatedproduct.qty + 1; 
                cart.products = [...cart.products];
                cart.products[existingProduct] = updatedproduct;
            } else {
                updatedproduct = { id:id, qty: 1};
                cart.products = [...cart.products, updatedproduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            console.log(cart);
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }
}