import Header from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import RippleButton from "@/components/ui/rippleButton";
import { useStripeCheckout } from "@/hooks/dashboard/useStripeCheckout";
import { CheckIcon, Loader, XIcon } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/clerk-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useTransactions } from "@/hooks/dashboard/useTransactions";

const SubscriptionPage = () => {
  const { sessionId } = useStripeCheckout();
  const Stripe_Publishable_Key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  const Stripe_Cancel_Subscription = import.meta.env
    .VITE_STRIPE_CANCEL_SUBSCRIPTION_URL;

  const { user } = useUser();
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  const { userTransactionsCount } = useTransactions();

  const handleAcquirePlanClick = async () => {
    if (!Stripe_Publishable_Key) {
      throw new Error("Stripe Publishable Key not found");
    }

    if (!sessionId) {
      throw new Error("Stripe Session ID not found");
    }

    const stripe = await loadStripe(Stripe_Publishable_Key);

    if (!stripe) {
      throw new Error("Stripe not found");
    }

    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <>
      <Header />

      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold max-md:mt-[75px]">Assinatura</h1>

        <div className="md:flex md:max-w-[900px] md:gap-6 max-md:space-y-6 ">
          {/* Plano Básico */}
          <Card className="w-full">
            <CardHeader className="border-b border-solid py-8 relative">
              {!hasPremiumPlan && (
                <Badge className="absolute top-5 left-5 bg-primary/10 text-primary px-3 py-1 hover:bg-primary/10">
                  Activo
                </Badge>
              )}
              <h2 className="text-xl text-center font-semibold">
                Plano Básico
              </h2>

              <div className="flex items-center gap-3 justify-center">
                <span className="font-semibold text-6xl">0</span>
                <span className="text-4xl">MTN</span>
                <div className="text-2xl text-muted-foreground">/ mês</div>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 py-5">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p className="flex items-center">
                  Apenas 10 transações (
                  {!userTransactionsCount ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    `${userTransactionsCount}/10`
                  )}
                  )
                </p>
              </div>

              <div className="flex items-center gap-2">
                <XIcon className="text-error" />
                <p>Relatórios de Inteligência Artificial (IA)</p>
              </div>
            </CardContent>
          </Card>

          {/* Plano Premium */}
          <Card className="w-full">
            <CardHeader className="border-b border-solid py-8 relative">
              {hasPremiumPlan && (
                <Badge className="absolute top-5 left-5 bg-primary/10 text-primary px-3 py-1 hover:bg-primary/10">
                  Activo
                </Badge>
              )}

              <h2 className="text-xl text-center font-semibold">
                Plano Premium
              </h2>

              <div className="flex items-center gap-3 justify-center">
                <span className="font-semibold text-6xl">100</span>
                <span className="text-4xl">MTN</span>
                <div className="text-2xl text-muted-foreground">/ mês</div>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 py-5">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatórios de Inteligência Artificial (IA)</p>
              </div>

              {hasPremiumPlan ? (
                <div className="flex justify-center">
                  <RippleButton
                    className="w-auto font-bold"
                    disabled={!sessionId}
                    variant={"link"}
                    asChild
                  >
                    <Link
                      to={`${Stripe_Cancel_Subscription}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
                    >
                      Gerenciar Plano
                    </Link>
                  </RippleButton>
                </div>
              ) : (
                <RippleButton
                  onClick={handleAcquirePlanClick}
                  className="w-full rounded-full font-bold"
                  disabled={!sessionId}
                >
                  Adquirir Plano
                </RippleButton>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
