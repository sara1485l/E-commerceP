const Coupen = require("../../../Coupen-Api-main/models/coupen");
const Cart = require("../../models/Cart");

const buyWithDiscount = async (req, res) => {
  try {
        const { username, discount_coupen } = req.body

        const products = await Cart.find({ username })
        if (products.length === 0) {
            return res.status(400).json({ error: "Cart is empty" })
        }
  
        const productNames = []
        products.forEach(p => {
            productNames.push(p.ProductName)

        });
        
        let total = 0;
        for (const p of products) {
            total += p.price;
        }

        let discount = 0;
        const coupen = await Coupen.findOne({ code: discount_coupen });
        if (coupen) {
            discount = 0.2
            await Coupen.deleteOne({ code: discount_coupen })
        }

        res.json({ ProductName: productNames,
            Total_before_discount: `$${total}`,
            Total_after_discount: `$${total - (total * discount)}`,
        });

    } catch (err) {
        res.status(500).json({ error: err })
    }
    };

module.exports = { buyWithDiscount }