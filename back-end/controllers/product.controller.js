

const Product = require('../models/Product.model.js');

// Find all products in the system
const findAllProducts = async () => await Product.find();

// Find a specific product
const findProductById = async id => {
    try {

        const product = await Product.findById(id);

        if (product == null) {
            throw {status: 204, msg: `No product with the id ${id} was found.`};
        }
        // Product was found
        return product;
    } catch (err) {
        // Product was not found
        throw err;
    }
};

// Create a new product
const createProduct = async productToSave => {
    try {
        const product = new Product(productToSave);
        await product.save();

        return product;
    } catch (err) {
        throw err;
    }
}

// Update specific product
const updateProduct = async (id, productToUpdate) => {
    try {
        await Product.findByIdAndUpdate(id, productToUpdate);
    } catch (err) {
        throw { status: 400, msg: err };
    }
};

// Delete specific product
const deleteProductById = async id => await Product.findByIdAndDelete(id);

// All methods to be referrenced by routes
module.exports = { findAllProducts, findProductById, createProduct, updateProduct, deleteProductById };
