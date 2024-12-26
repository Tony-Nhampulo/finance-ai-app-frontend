import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import IndividualSummaryCard from "./individual-summary-card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTransactionsSummarys } from "@/hooks/dashboard/useTransactionsSummarys";
import { isMatch } from "date-fns";

const SummaryCards = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year")?.toString();
  const month = searchParams.get("month")?.toString();
  const { transactionsSummary } = useTransactionsSummarys(
    String(year),
    String(month)
  );

  const isInvalidYear = !isMatch(String(year), "yyyy");
  const isInvalidMonth = !isMatch(String(month), "MM");

  if ((year && isInvalidYear) || (month && isInvalidMonth)) {
    navigate(`/dashboard`);
  }

  return (
    <div className="space-y-4">
      {/* Primeiro Card */}
      <IndividualSummaryCard
        icon={<WalletIcon size={16} />}
        title={<p>Saldo</p>}
        amount={transactionsSummary?.total_balance}
        cardSize={"large"}
      />

      {/* Demais Cards */}
      <div className="grid grid-cols-3 gap-4">
        <IndividualSummaryCard
          icon={<PiggyBankIcon size={16} />}
          title={<p className="opacity-70">Investimento</p>}
          amount={transactionsSummary?.total_investment}
        />

        <IndividualSummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title={<p className="text-primary opacity-70">Depósito</p>}
          amount={transactionsSummary?.total_deposit}
        />

        <IndividualSummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title={<p className="text-error opacity-70">Despesa</p>}
          amount={transactionsSummary?.total_expense}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
