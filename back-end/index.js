
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/warehouse', require('./routes/warehouse.route.js'));
app.use('/product', require('./routes/product.route.js'));


const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB!');
    } catch (err) {
        // This runs if it fails to connect to MongoDB
        console.error(err);
        process.exit(1); // Immediately kill the server
    }
}

connectToMongo();

app.listen(process.env.PORT || 8080, () => {
    // This callback runs right when the app starts
    console.log(`Listening on port ${process.env.PORT || 8080}`);
});
