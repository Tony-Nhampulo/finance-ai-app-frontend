import Header from "@/components/Header";
import { useUser } from "@clerk/clerk-react";

const DashboardPage = () => {
  const { user } = useUser();

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center">
        Olá, {user?.firstName}
        {/* <RippleButton variant={"outline"} size="sm">
        <UserButton showName />
      </RippleButton> */}
      </div>
    </>
  );
};

export default DashboardPage;
