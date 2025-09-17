const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const { authenticate, isAdmin } = require("../middleware/auth");

// Public
router.get("/all-product", getAllProducts);
router.get("/:product", getProduct);

// middleware auth 
router.post("/add-product",authenticate, addProduct);
router.delete("/delete-product",authenticate, deleteProduct);
router.put("/change-data",authenticate, updateProduct);


module.exports = router;
