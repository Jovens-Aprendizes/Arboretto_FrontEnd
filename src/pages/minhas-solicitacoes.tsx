import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Navbar from "../components/sidebar/sidebar";

const MinhasSolicitacoes = () => {

  return (
    <Navbar>

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

  return {
    props: {},
  };
};
