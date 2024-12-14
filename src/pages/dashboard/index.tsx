import RippleButton from "@/components/ui/rippleButton";
import { useLogout } from "@/hooks/dashboard/useLogout";
import { useUser } from "@clerk/clerk-react";
import { Loader, LogOutIcon } from "lucide-react";

const DashboardPage = () => {
  const { user } = useUser();
  const { handleLogout, logoutLoading } = useLogout();
  return (
    <div className="flex flex-col items-center justify-center">
      Olá, {user?.firstName}
      {/* <RippleButton variant={"outline"} size="sm">
        <UserButton showName />
      </RippleButton> */}
      <RippleButton onClick={handleLogout}>
        {logoutLoading ? (
          <>
            <Loader className="mx-auto animate-spin" /> Processando...
          </>
        ) : (
          <>
            <LogOutIcon className="h-4 w-4" /> Sair
          </>
        )}
      </RippleButton>
    </div>
  );
};

export default DashboardPage;
