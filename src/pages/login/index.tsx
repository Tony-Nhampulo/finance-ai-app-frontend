import { Button } from "@/components/ui/button";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";

const LoginPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (isSignedIn) {
    return (
      <div className="flex flex-col">
        Olá, {user.firstName}
        <SignOutButton>
          <Button>
            <LogOutIcon />
            Sair
          </Button>
        </SignOutButton>
      </div>
    );
  }

  return (
    <div className="h-screen md:grid md:grid-cols-2">
      {/* Left Side */}
      <div className="mx-auto flex h-full max-w-[500px] flex-col justify-center p-8">
        <img
          src={"src/assets/logo.png"}
          width={173}
          height={39}
          alt="Finance AI Logo"
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="mb-8 text-justify text-muted-foreground">
          A Finance AI é uma plataforma de gestão fanceira que utiliza
          Inteligência Artificial para monitorar suas finanças, e, oferecer
          insights personalizados, facilitando o controle do seu orçamento.
        </p>

        <SignInButton>
          <Button>
            <LogInIcon />
            Fazer Login ou Criar Conta
          </Button>
        </SignInButton>
      </div>

      {/* Right Side */}
      <div
        className="hidden h-full w-full bg-cover bg-center text-white md:block"
        style={{ backgroundImage: `url(src/assets/login-page-background.png)` }}
      ></div>
    </div>
  );
};

export default LoginPage;
