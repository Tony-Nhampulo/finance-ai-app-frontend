import { UserButton, useUser } from "@clerk/clerk-react";

const DashboardPage = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Olá, {user?.firstName} */}
      <UserButton showName />
    </div>
  );
};

export default DashboardPage;
