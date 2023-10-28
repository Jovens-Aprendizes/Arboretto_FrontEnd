import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Navbar from "../components/sidebar/sidebar";
import SolicitacoesAdm from "../components/solicitacoes/solicitacoes";
import axios from "axios";

interface Props {
  solicitacoesData: any;
}

const Solicitacoes = ({ solicitacoesData }: Props) => {
  return (
    <Navbar>
      <SolicitacoesAdm solicitacoesData={solicitacoesData}/>
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

  try {

    const solicitacoesData = await axios
      .get(
        `https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/usuario-space/listar`
      )
      .then((response) => response.data);

    return {
      props: {
        solicitacoesData,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }

  return {
    props: {},
  };
  return {
    props: {},
  };
};
