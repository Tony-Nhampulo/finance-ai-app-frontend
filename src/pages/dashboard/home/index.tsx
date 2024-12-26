import Header from "@/components/Header";
import SummaryCards from "./components/summary-cards";
import DataPeriodSelect from "./components/data-period-select";

const DashboardPage = () => {
  return (
    <>
      <Header />

      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <div className="flex items-center gap-3">
            <DataPeriodSelect />
          </div>
        </div>

        <div className=" grid grid-cols-[2fr,1fr]">
          <SummaryCards />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
