import axios from "axios";

export async function login(cpf, password) {
  try {
    const response = await axios.get(
      "https://arborettoapi.azurewebsites.net/api-arboretto-dev/v1/usuario/login",
      {
        headers: {
          cpf: cpf,
          senha: password,
        },
      }
    );

    if (response) {
      const data = response.data;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data));
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erro ao autenticar:", error);
    return false;
  }
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
}

export function isAuthenticated() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("user");
    return !!token;
  }
  return false;
}