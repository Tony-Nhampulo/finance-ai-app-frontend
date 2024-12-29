import { useUser } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOutIcon, MenuIcon, User2 } from "lucide-react";
import RippleButton from "./ui/rippleButton";
import { useLogout } from "@/hooks/dashboard/useLogout";
import Loader from "./Loader";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const { pathname } = useLocation();
  const { user } = useUser();
  const { handleLogout, logoutLoading } = useLogout();
  //console.log(user);
  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4 max-md:fixed max-md:w-full max-md:z-50 max-md:bg-background/95 max-md:backdrop-blur max-md:supports-[backdrop-filter]:bg-background/60">
      {/* Esquerda */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"} className="md:hidden" size={"icon"}>
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side={"left"} className="p-0 w-64">
          <SheetHeader>
            <SheetTitle className="border-b border-solid p-4">
              <img
                src={"../src/assets/logo.png"}
                width={150}
                height={39}
                alt="Finance AI Logo"
              />
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col">
            <RippleButton
              variant={"outline"}
              className={`w-full border-0 rounded-none block text-left pl-12 ${pathname == "/dashboard" ? "font-bold text-primary pl-10 border border-l-4 border-l-primary border-t-0 border-r-0 border-b-0" : "text-primary-foreground"}`}
              size={"lg"}
            >
              <Link
                to={`/dashboard?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}`}
              >
                Dashboard
              </Link>
            </RippleButton>

            <RippleButton
              variant={"outline"}
              className={`w-full border-0 rounded-none block text-left pl-12 ${pathname == "/dashboard/transactions" ? "font-bold text-primary pl-10 border border-l-4 border-l-primary border-t-0 border-r-0 border-b-0" : "text-primary-foreground"}`}
              size={"lg"}
            >
              <Link to={"/dashboard/transactions"}>Transações</Link>
            </RippleButton>

            <RippleButton
              variant={"outline"}
              className={`w-full border-0 rounded-none block text-left pl-12 ${pathname == "/dashboard/subscription" ? "font-bold text-primary pl-10 border border-l-4 border-l-primary border-t-0 border-r-0 border-b-0" : "text-primary-foreground"}`}
              size={"lg"}
            >
              <Link to={"/dashboard/subscription"}>Assinatura</Link>
            </RippleButton>
          </div>

          <SheetFooter className="border-t border-solid w-full absolute bottom-0">
            <RippleButton
              variant={"ghost"}
              className="w-full rounded-none p-6"
              size={"lg"}
              onClick={handleLogout}
              disabled={logoutLoading}
            >
              {logoutLoading ? (
                <>
                  <Loader text="Terminando Sessão" />
                </>
              ) : (
                <>
                  <LogOutIcon className="h-4 w-4" /> Terminar Sessão
                </>
              )}
            </RippleButton>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <div className="md:flex items-center gap-10 hidden">
        <img
          src={"../src/assets/logo.png"}
          width={150}
          height={39}
          alt="Finance AI Logo"
        />

        <Link
          to={`/dashboard?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}`}
          className={`mt-1 ${pathname == "/dashboard" ? "font-bold text-primary" : "text-primary-foreground"}`}
        >
          Dashboard
        </Link>

        <Link
          to={"/dashboard/transactions"}
          className={`mt-1 ${pathname == "/dashboard/transactions" ? "font-bold text-primary" : "text-primary-foreground"}`}
        >
          Transações
        </Link>

        <Link
          to={"/dashboard/subscription"}
          className={`mt-1 ${pathname == "/dashboard/subscription" ? "font-bold text-primary" : "text-primary-foreground"}`}
        >
          Assinatura
        </Link>
      </div>

      {/* Direita */}
      <div className="mt-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"}>
              <div className="flex items-center gap-2">
                <p className="text-[15px]">{user?.fullName}</p>

                <Avatar className="h-7 w-7">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>
                    <User2 />
                  </AvatarFallback>
                </Avatar>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="mx-6 space-y-4 p-0">
            <div className="flex items-center gap-3 pb-1 pl-4 pr-4 pt-4">
              <div>
                <Avatar>
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>
                    <User2 />
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="text-sm">
                <p>{user?.fullName}</p>
                <p>{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>

            <div className="border-t border-solid">
              <RippleButton
                variant={"ghost"}
                className="w-full"
                size={"lg"}
                onClick={handleLogout}
                disabled={logoutLoading}
              >
                {logoutLoading ? (
                  <>
                    <Loader text="Terminando Sessão" />
                  </>
                ) : (
                  <>
                    <LogOutIcon className="h-4 w-4" /> Terminar Sessão
                  </>
                )}
              </RippleButton>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Header;
