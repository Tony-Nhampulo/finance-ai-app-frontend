import { api } from "@/services/api";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export function useStripeCheckout() {
  const { isSignedIn } = useAuth();
  const [sessionId, setSessionId] = useState("");
  const Stripe_Premium_Plan_Price_Id = import.meta.env
    .VITE_STRIPE_PREMIUM_PLAN_PRICE_ID;

  useEffect(() => {
    if (isSignedIn) {
      createStripeSessionCheckout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  const createStripeSessionCheckout = async (/*price_id: string*/) => {
    if (!isSignedIn) {
      throw new Error("Unauthenticated user");
    }

    try {
      const response = await api.post(`/create-stripe-session-checkout`, {
        price_id: Stripe_Premium_Plan_Price_Id,
      });

      setSessionId(response.data.sessionId);
    } catch (error) {
      console.error("Error creating Stripe Session Checkout:", error);
    }
  };

  return { sessionId };
}
