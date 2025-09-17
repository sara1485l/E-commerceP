const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const authSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    number : {
        type: Number,
        required: true
    },
    shoppingCart: {
        type: [String], 
        default: []
    }
});

const Auth = model('Auth', authSchema);
export default { Auth };



