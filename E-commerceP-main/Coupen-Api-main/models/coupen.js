const mongoose = require('mongoose');

const coupenSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    discount: {
        type: Number, 
        required: true
    }
});

const Coupen = mongoose.model('Coupen', coupenSchema);
module.exports = { Coupen };
