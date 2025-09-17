
const Cart = require("../../models/Cart");



const buyWithoutDiscount = async (req, res) => {
    try {
      const { username } = req.body;
      const products = await Cart.find({ username });
      if (products.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      const productNames = [];
      products.forEach(p => {
        productNames.push(p.ProductName);
      });
      
       let total = 0;
      for (const p of products) {
        total += p.price;
      }

      res.json({ProductName: productNames, total: `$${total}`});


     

 
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }



module.exports = { buyWithoutDiscount };