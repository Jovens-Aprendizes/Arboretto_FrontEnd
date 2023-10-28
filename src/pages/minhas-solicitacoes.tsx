import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Navbar from "../components/sidebar/sidebar";
import MinhasSolicitacoesCondomino from "../components/minhasSolicitacoes/minhasSolicitacoes";
import axios from "axios";
interface Props { solicitacoesData:any };

const MinhasSolicitacoes = ({solicitacoesData}:Props) => {
console.log(solicitacoesData)
  return (
    <Navbar>
      <MinhasSolicitacoesCondomino solicitacoesData={solicitacoesData}/>
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
    const userResponse = await axios.get(`https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/usuario/filter-id?id=${userId}`);
    const userData = userResponse.data;
  
    // Agora que você tem os dados do usuário, pode buscar as solicitações dele
    const solicitacoesResponse = await axios.get(`https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/usuario-space/listar-por-usuario-id?usuarioId=${userId}`);
    const solicitacoesData = solicitacoesResponse.data;

    return {
      props: {
        solicitacoesData
    },}
  
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
  
  return {
    props: {},
  };
};
