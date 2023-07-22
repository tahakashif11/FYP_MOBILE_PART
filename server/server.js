const stripe = require('stripe')('sk_test_51MiGf3BnVuFOu736n5I6ic5bU4e8fY8y5b5BcpVQQxqWm7myIWtkxnE73o7HnVU1HoUV8vYCNVliIbHxt9EHZzyQ00xF64JhYf');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("hello folks")
})
app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const { amount, currency } = req.body
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2022-11-15' }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customer.id,
    payment_method_types: ['card'],

  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});
app.listen(4002, () => console.log("running on http://localhost:4002"))