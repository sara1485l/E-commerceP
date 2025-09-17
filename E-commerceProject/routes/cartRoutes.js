const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

router.get("/:username", getCart);
router.post("/add", addToCart);
router.delete("/remove", removeFromCart);
router.delete("/clear", clearCart);

module.exports = router;
