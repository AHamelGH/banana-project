

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * What are the properties of a product?
 * 
 * _id Number
 * Name of product
 * Description
 * Price per Unit
 * Supplier
 */

const productSchema = new Schema({

    name: String,
    supplier: String,
    description: String,
    price: Number,
    imageUrl: String
});


const Product = mongoose.model('Product', productSchema, 'Product');

module.exports = Product;