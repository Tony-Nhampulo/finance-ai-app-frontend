import AddTransactionButton from "@/components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface IndividualSummaryCardProps {
  icon: ReactNode;
  title: ReactNode;
  amount: number | ReactNode;
  cardSize?: "small" | "large";
}

const IndividualSummaryCard = ({
  icon,
  title,
  amount,
  cardSize = "small",
}: IndividualSummaryCardProps) => {
  return (
    <Card className="max-sm:mt-4">
      <CardHeader className="flex-row items-center gap-2 px-6 py-3">
        {icon}
        {title}
      </CardHeader>

      <CardContent className="flex justify-between max-md:flex-col">
        <p
          className={`font-bold text-muted-foreground ${cardSize == "small" ? "text-2xl" : "text-4xl text-white max-md:mb-5"}`}
        >
          {amount == undefined ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <>
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "MTN",
                useGrouping: true,
              }).format(Number(amount))}
            </>
          )}
        </p>
        {cardSize == "large" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
};

export default IndividualSummaryCard;
