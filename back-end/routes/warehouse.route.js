

const router = require('express').Router();
const { findAllWarehouses, findWarehouseById, createWarehouse, updateWarehouse, deleteWarehouseById } = require('../controllers/warehouse.controller.js');
const mongoose = require('mongoose');


const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(204).send();
    } else {
        next(); // This calls the standard route for GET/POST/PUT/DELETE with (req, res)
    }
}


// GET ALL WAREHOUSES
router.get('/', async (req, res) => {
    const warehouse = await findAllWarehouses();
    res.json(warehouse);
});

// GET WAREHOUSE BY ID
router.get('/:id', validateObjectId, async (req, res) => {
    try {
        const warehouse = await findWarehouseById(req.params.id);
        res.json(warehouse);
    } catch (err) {
        // No warehouse found
        console.log(err);
        res.status(err?.status ?? 500).json(err);
    }
});


// POST http://localhost:9000/warehouse
// CREATE A WAREHOUSE
router.post('/', async (req, res) => {
    try {
        const warehouse = await createWarehouse(req.body);
        res.status(201).json(warehouse);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});


// UPDATE A WAREHOUSE
router.put('/:id', validateObjectId, async (req, res) => {
    try {
        await updateWarehouse(req.params.id, req.body);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});


// DELETE A WAREHOUSE
router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        await deleteWarehouseById(req.params.id);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});


module.exports = router;
