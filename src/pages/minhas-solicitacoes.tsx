import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Navbar from "../components/sidebar/sidebar";
import MinhasSolicitacoesCondomino from "../components/minhasSolicitacoes/minhasSolicitacoes";
import axios from "axios";

interface Props {
  solicitacoesData: any;
}

const MinhasSolicitacoes = ({ solicitacoesData }: Props) => {
  return (
    <Navbar>
      <MinhasSolicitacoesCondomino solicitacoesData={solicitacoesData} />
    </Navbar>
  );
};

export default MinhasSolicitacoes;

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
    const user = await axios
      .post(
        process.env.NEXT_PUBLIC_AUTH_URL ||
          "https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/usuario/login",
        { token: token },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      )
      .then((response) => response.data);

    const solicitacoesData = await axios
      .get(
        `https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/usuario-space/listar-por-usuario-id?usuarioId=${user.id}`
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
};
