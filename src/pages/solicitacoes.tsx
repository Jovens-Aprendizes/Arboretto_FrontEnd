import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Navbar from "../components/sidebar/sidebar";
import SolicitacoesAdm from "../components/solicitacoes/solicitacoes";

const Solicitacoes = () => {

  return (
    <Navbar>
      <SolicitacoesAdm/>
    </Navbar>
  );
};

export default Solicitacoes;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "arboretto-token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};