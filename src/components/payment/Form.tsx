import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../_redux/_Store";
import ActionButton from "../hoc/buttons/actionButton";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const ShoppingCart = useSelector((state: IRootState) => state.cart);
  const loggedInUserName = useSelector(
    (state: IRootState) => state.userAuth.loggedInUser?.displayName
  );
  const [userName, setUserName] = React.useState<string | null | undefined>(
    "Guest"
  );
  React.useEffect(() => {
    if (!loggedInUserName) return;
    setUserName(loggedInUserName);
  }, [loggedInUserName]);
  const onPaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: ShoppingCart.cartTotal * 100 }),
    }).then((res) => res.json());

    console.log("response", response);
    const {
      paymentIntent: { client_secret },
    } = response;
    console.log("client_secret", client_secret);

    const paymentResult = await stripe
      .confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: userName!,
          },
        },
      })
      .then((result) => {
        if (result.paymentIntent) {
          console.log(result.paymentIntent);
        } else {
          console.log("Error: ", result.error);
        }
      });
  };

  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={onPaymentSubmit}>
        <CardElement />
        <ActionButton ClassType="inverted" actionType="submit">
          Pay
        </ActionButton>
      </form>
    </div>
  );
};

export default PaymentForm;
