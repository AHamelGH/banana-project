

const router = require('express').Router();
const { findAllProducts, findProductById, createProduct, updateProduct, deleteProductById } = require('../controllers/product.controller.js');
const mongoose = require('mongoose');


const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(204).send(); // Send back the response early
    } else {
        next(); // This calls the standard route for GET/POST/PUT/DELETE with (req, res)
    }
}


// GET ALL PRODUCTS
router.get('/', async (req, res) => {
    const product = await findAllProducts();
    res.json(product);
});

// GET PRODUCT BY ID
router.get('/:id', validateObjectId, async (req, res) => {
    // req.params.id extracts the id number from the URL
    try {
        const product = await findProductById(req.params.id);
        res.json(product);
    } catch (err) {
        // No product found
        console.log(err);
        res.status(err?.status ?? 500).json(err);
    }
});


// POST http://localhost:9000/product
// CREATE A PRODUCT
router.post('/', async (req, res) => {
    try {
        // For POST requests, we send the data through the request body
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});


// UPDATE A PRODUCT
router.put('/:id', validateObjectId, async (req, res) => {
    try {
        await updateProduct(req.params.id, req.body);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});


// DELETE A PRODUCT
router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        await deleteProductById(req.params.id);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});


module.exports = router;
