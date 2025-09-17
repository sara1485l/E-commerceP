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


module.exports = router;
