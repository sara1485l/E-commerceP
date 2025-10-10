const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {Coupen} = require('./models/coupen');
const {Auth} = require('./models/auth').default;
const {connectDB} = require('./config/connDB');

connectDB();
const app = express();

app.use(cors());
app.use(express.json());


app.post('/get-coupen', async (req, res) => {
  const {username, password} = req.headers;
  const auth = await Auth.findOne({username});
  if(!auth) {
        return res.status(401).send('Unauthorized..........');
    }
  if(auth.password !== password) {
        return res.status(401).send('Unauthorized..........');
    }
   if (auth.number === 0) {
        return res.status(401).send('Unauthorized..........');
    }
    const number = auth.number
    await Auth.findOneAndUpdate({username}, {number: number-1});
    const Allcoupen = await Coupen.find();
    const coupen = Allcoupen[0];
    res.send({"Discount code ": coupen.code});
});

app.post('/discount', async (req, res) => {
    const {code} = req.body;
    const coupen = await Coupen.findOne({code});
    if(!coupen) {
        return res.status(400).send('Invalid code');
    }
    await Coupen.deleteOne({
        code
    });
    res.send('Discount applied');
})
// 
app.post('/buy/without-discount', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await Auth.findOne({ username });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const cartProducts = user.shoppingCart || [];
    const products = await Coupen.find({ ProductName: { $in: cartProducts } });
    const total = products.reduce((acc, p) => acc + p.price, 0);

    return res.json({
      ProductName: cartProducts,
      total: `$${total}`
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.post('/buy/discount', async (req, res) => {
  try {
    const { username, discount_coupen } = req.body;
    const user = await Auth.findOne({ username });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const cartProducts = user.shoppingCart || [];
    const products = await Coupen.find({ ProductName: { $in: cartProducts } });
    const totalBefore = products.reduce((acc, p) => acc + p.price, 0);

    const coupon = await Coupen.findOne({ code: discount_coupen });
    if (!coupon) return res.status(400).json({ msg: "Invalid coupon" });

    const discountAmount = (totalBefore * coupon.discount) / 100;
    const totalAfter = totalBefore - discountAmount;

    return res.json({
      ProductName: cartProducts,
      Total_before_discount: `$${totalBefore}`,
      Total_after_discount: `$${totalAfter}`
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
// 





















mongoose.connection.once('open', () => {
  console.log('Database connected......');
  app.listen(8000, () => {
    console.log('Server started......');
  });
})


mongoose.connection.on('error', (error) => {
  console.error(error);
});

