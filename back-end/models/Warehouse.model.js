

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * What are the properties of a warehouse?
 * 
 * _id Number
 * Name of warehouse
 * Location
 * Maximum Capacity (Can be null)
 * Current Capacity?
 * All stored products
 */

 const warehouseSchema = new Schema({

    name: String,
    location: String,
    maxCapacity: Number,
    products: [{productId: Number,
                volume: Number}]
});


const Warehouse = mongoose.model('Warehouse', warehouseSchema, 'Warehouse');

module.exports = Warehouse;