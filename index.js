const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
//Test API
const stripe = Stripe(process.env.STRIPE_PAYMENT_SECRET_KEY);

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

app.listen(process.env.PORT, () => console.log('Stripe Server running...'));
