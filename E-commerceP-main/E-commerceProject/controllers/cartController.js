const Cart = require("../models/Cart");

const getCart = async (req, res) => {
  try {
    const { username } = req.params;
    const cart = await Cart.findOne({ username });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { username, ProductName, quantity } = req.body;

    let cart = await Cart.findOne({ username });

    if (!cart) {
      cart = new Cart({
        username,
        products: [{ ProductName, quantity: quantity || 1 }],
      });
    } else {
      const existingProduct = cart.products.find(p => p.ProductName === ProductName);
      if (existingProduct) {
        existingProduct.quantity += quantity || 1;
      } else {
        cart.products.push({ ProductName, quantity: quantity || 1 });
      }
    }

    await cart.save();
    res.status(201).json({ message: "Product added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { username, ProductName } = req.body;

    const cart = await Cart.findOne({ username });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(p => p.ProductName !== ProductName);

    await cart.save();
    res.json({ message: "Product removed from cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Error removing product", error: err.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const { username } = req.body;

    const cart = await Cart.findOne({ username });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = [];
    await cart.save();

    res.json({ message: "Cart cleared", cart });
  } catch (err) {
    res.status(500).json({ message: "Error clearing cart", error: err.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};
