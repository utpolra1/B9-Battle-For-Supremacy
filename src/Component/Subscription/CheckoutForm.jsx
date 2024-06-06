import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "../Axios/UseAxiosScoure";
import { authContext } from "../../Firebase/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(authContext);
  const [transactionId, setTransactionId] = useState("");
  const { price } = useParams("");
  console.log(price);

  // User get
  const axiosSecurea = UseAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecurea.get("/user");
      return res.data;
    },
  });

  const singleuser = users.find((userss) => userss?.email === user?.email); // Use find instead of filter

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: price })
        .then((res) => {
          console.log("Client Secret:", res.data.clientSecret);

          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
          setError("Failed to create payment intent. Please try again.");
        });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      console.log("[PaymentMethod Error]", paymentMethodError);
      setError(paymentMethodError.message);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    if (!clientSecret) {
      console.error("Client secret is missing.");
      setError("Client secret is missing. Cannot process payment.");
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.error("Confirm Payment Error:", confirmError);
      setError(confirmError.message);
      return;
    }
    console.log("[PaymentIntent]", paymentIntent);
    setTransactionId(paymentIntent.id);
    toast.success("Payment successful!");

    // Access singleuser._id correctly
    if (singleuser && singleuser._id) {
      axiosSecure
        .patch(`/user/paid/${singleuser._id}`)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            toast.success("Payment successful!");
          }
        })
        .catch((error) => {
          console.error("Error updating user status:", error);
          setError("Failed to update user status. Please try again.");
          toast.success("Payment successful!");
        });
    } else {
      console.error("User not found or ID is missing.");
      setError("User not found or ID is missing.");
    }
    setError("");
    clientSecret(" ");
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button className="btn mt-10" type="submit" disabled={!stripe}>
        Pay ${price}
      </button>
      {error && <p className="text-red-600">{error}</p>}
      <p className="text-green-500">
        <span className="text-black">TransectionID:</span> {transactionId}
      </p>
    </form>
  );
};

export default CheckoutForm;
