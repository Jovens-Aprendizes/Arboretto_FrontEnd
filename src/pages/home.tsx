import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
// import Dados from "../components/dados/dados";
import Navbar from "../components/sidebar/sidebar";
import { Heading, Stack } from "@chakra-ui/react";


const Home = () => {

  return (
    <Navbar>
          <Stack spacing="6" textAlign="center">
            <Heading
              fontSize="50"
              fontFamily="Inter"
              fontWeight="400"
            >
              A R B O R E T T O
            </Heading>
            <img
              src="/logo.png"
              alt="Logo(Árvore)"
              width="600"
              height="800"
              style={{
                right: "0",
                top: "10px",
                left: "370px",
                position: "relative",
                display: "block",
              }}
            />
          </Stack>
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
