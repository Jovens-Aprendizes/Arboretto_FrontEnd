import { ReactNode, createContext, useEffect, useState } from "react";
import axios from "axios";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";

type User = {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  numeroApartamento: string;
  bloco: string;
  cargo: CargoType;
  dataNascimento: string;
};

export enum CargoEnum {
  INQUILINO = "inquilino",
  ADMINISTRADOR = "administrador",
  PROPRIETARIO = "proprietário",
}

export type CargoType = (typeof CargoEnum)[keyof typeof CargoEnum];

type Credentials = {
  cpf: string;
  senha: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: Credentials) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

type NavbarProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: NavbarProps) {
  const [user, setUser] = useState<User>({} as User);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "arboretto-token": token } = parseCookies();

    if (token) {
      axios
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
        .then((response) => {
          if (response.data.id) {
            setUser(response.data);
          } else {
            destroyCookie(undefined, "arboretto-token");
            Router.push("/");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  async function signIn({ cpf, senha }: Credentials) {
    try {
      const token = btoa(JSON.stringify({ cpf: cpf, senha: senha }));
      axios
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
        .then((response) => {
          if (response.data.id) {
            setUser(response.data);
            setCookie(undefined, "arboretto-token", token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
            });
            Router.push("/home");
          } else {
            alert("login inválido");
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  function logout() {
    destroyCookie(undefined, "arboretto-token");
    Router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
