import { GetServerSideProps } from "next";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { parseCookies } from "nookies";
import Navbar from "../components/sidebar/sidebar";

const Lancamentos = () => {
  const { user } = useContext(AuthContext);

  return (
    <Navbar>

    </Navbar>
  );
};

export default Lancamentos;

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
