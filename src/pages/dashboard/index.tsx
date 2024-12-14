import { Button } from "@/components/ui/button";
import RippleButton from "@/components/ui/rippleButton";
import { UserButton, useUser } from "@clerk/clerk-react";

const DashboardPage = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Olá, {user?.firstName} */}

      <RippleButton variant={"outline"} size="sm">
        <UserButton showName />
      </RippleButton>
    </div>
  );
};

export default DashboardPage;
