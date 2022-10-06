

const Warehouse = require('../models/Warehouse.model.js');

// Find all warehouses in the system
const findAllWarehouses = async () => await Warehouse.find();

// Find a specific warehouse
const findWarehouseById = async id => {
    try {

        const warehouse = await Warehouse.findById(id);

        if (warehouse == null) {
            throw {status: 204, msg: `No warehouse with the id ${id} was found.`};
        }
        // Warehouse was found
        return warehouse;
    } catch (err) {
        // Warehouse was not found
        throw err;
    }
};

// Create a new warehouse
const createWarehouse = async warehouseToSave => {
    try {
        const warehouse = new Warehouse(warehouseToSave);
        await warehouse.save();

        return warehouse;
    } catch (err) {
        throw err;
    }
}

// Update specific warehouse
const updateWarehouse = async (id, warehouseToUpdate) => {
    try {
        await Warehouse.findByIdAndUpdate(id, warehouseToUpdate);
    } catch (err) {
        throw { status: 400, msg: err };
    }
};

// Delete specific warehouse
const deleteWarehouseById = async id => await Warehouse.findByIdAndDelete(id);

// All methods to be referrenced by routes
module.exports = { findAllWarehouses, findWarehouseById, createWarehouse, updateWarehouse, deleteWarehouseById };
