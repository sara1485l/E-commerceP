const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const { authenticate, isAdmin } = require("../middleware/auth");

router.get("/:username",authenticate, getCart);
router.post("/add",authenticate, addToCart);
router.delete("/remove",authenticate, removeFromCart);
router.delete("/clear",authenticate, clearCart);

module.exports = router;
