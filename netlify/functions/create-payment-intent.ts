require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
      description: "Payment request",
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log("ERROR: ", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
