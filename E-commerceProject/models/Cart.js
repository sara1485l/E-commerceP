const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  username: { type: String, required: true },
  products: [
    {
      ProductName: {
         type: String, 
         required: true },
      price: {
         type: Number, 
         required: true },   
      quantity: {
         type: Number, 
         default: 1 }
    }
  ]
}, 
{ 
  timestamps: true
});

module.exports = mongoose.model("Cart", cartSchema);
