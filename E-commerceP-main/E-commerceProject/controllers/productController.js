const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};


const getProduct = async (req, res) => {
  try {
    const { product } = req.params;
    const prod = await Product.findOne({ ProductName: product });
    if (!prod) return res.status(404).json({ message: "Product not found" });
    res.json(prod);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { ProductName, title, description, price } = req.body;

    const exists = await Product.findOne({ ProductName });
    if (exists) return res.status(400).json({ message: "Product already exists" });

    const product = new Product({ ProductName, title, description, price });
    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { ProductName } = req.body;
    const deleted = await Product.findOneAndDelete({ ProductName });
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted", deleted });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { ProductName } = req.body;
    const updated = await Product.findOneAndUpdate(
      { ProductName },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
