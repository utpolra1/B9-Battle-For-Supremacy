import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import SectionTitle from "./SectionTitle";

const Subscription = () => {
  const stripePromise = loadStripe('pk_test_51POGSPP1lGcxAMyn1sYf9SpA5VJgeUYEp00EOsKWfydtv4iDC8pKjGv3KQhcYFXHYwTchmMsjPYQTY6n5ftYoK7n00yHG1s2au');
  return (
    <div>
        <SectionTitle heading='Payment' subHeading=''>
            
        </SectionTitle>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
          <div className="mb-10"></div>
        </Elements>
      </div>
    </div>
  );
};

export default Subscription;
