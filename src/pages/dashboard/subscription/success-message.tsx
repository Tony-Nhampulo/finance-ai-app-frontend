import Header from "@/components/Header";
import RippleButton from "@/components/ui/rippleButton";
import { Link } from "react-router-dom";

const SuccessMessage = () => {
  return (
    <div className="w-full h-screen relative">
      <Header />

      <div className="p-6 absolute w-full md:h-[calc(100%-75px)] max-md:h-full flex items-center content-center  justify-center flex-col ">
        <h1 className="md:text-4xl max-md:text-2xl font-bold max-md:mt-[75px] text-primary">
          Parabéns.
        </h1>
        <h3 className="md:text-xl max-md:text-l md:mt-1">
          Plano Premium adquirido com sucesso!
        </h3>

        <RippleButton asChild className="rounded-full mt-6 max-md:mt-4">
          <Link to={"/dashboard"}>
            Clique aqui para voltar à Página Inicial
          </Link>
        </RippleButton>
      </div>
    </div>
  );
};

export default SuccessMessage;
