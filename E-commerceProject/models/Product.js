const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  ProductName: { 
    type: String, 
    required: true, 
    unique: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: {
     type: String 
  },
  price: {
     type: Number, 
     required: true },
},
 { 
  timestamps: true 
});

module.exports = mongoose.model("Product", productSchema);
