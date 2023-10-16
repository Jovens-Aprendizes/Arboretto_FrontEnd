import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Dados from "../components/dados/dados";
import Navbar from "../components/sidebar/sidebar";


const Home = () => {


  return (
    <Navbar>
    </Navbar>
  );
};

export default Home;

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
