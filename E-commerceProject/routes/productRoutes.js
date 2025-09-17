const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

// Public
router.get("/all-product", getAllProducts);
router.get("/:product", getProduct);

// middleware auth 
router.post("/add-product", addProduct);
router.delete("/delete-product", deleteProduct);
router.put("/change-data", updateProduct);
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


module.exports = router;
