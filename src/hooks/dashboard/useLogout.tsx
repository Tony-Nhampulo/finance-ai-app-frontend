import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { persistUserId } from "@/config/constants.tsx";
import { useState } from "react";
import { sleep } from "@/helpers";

export function useLogout() {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await sleep(2000);
      sessionStorage.removeItem(persistUserId); // Clear userId from session storage
      await signOut(); // Call Clerk's sign-out method

      setTimeout(() => {
        navigate("/");
      }, 500);

      console.log("Clicking");
    } catch (error) {
      console.log(error);
    } finally {
      setLogoutLoading(false);
    }
  };

  return { handleLogout, logoutLoading };
}
