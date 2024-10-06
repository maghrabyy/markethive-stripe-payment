const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
//Test API
const stripe = Stripe('sk_test_51Q6Bl6044til73YWxvtjT2Ii6OTSF8bwySWfnQokjSA6yp4mjqMhraKDPHDPB1nbhbOSmRkFfJM4VCTc7y3mlgEX00qiFyAA1S');

app.use(express.json());
app.use(cors());

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
