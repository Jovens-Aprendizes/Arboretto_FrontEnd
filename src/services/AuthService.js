import axios from "axios";
// auth.js (ou AuthService.js)
class AuthService {
  async login(cpf, password) {
    try {
      // Chame a API para autenticar o usuário (substitua 'apiEndpoint' pelo seu URL real)
      const response = await axios.get(
        "http://arborettoapi.azurewebsites.net/api-arboretto-dev/v1/usuario/login",
        {
          headers: {
            cpf: cpf,
            senha: password,
          },
          // body: JSON.stringify({ cpf, password }),
        }
      );
      console.log(response);
      if (response) {
        const data = response.data;
        localStorage.setItem("user", JSON.stringify(data));

        return true; // Login bem-sucedido
      } else {
        return false; // Falha no login
      }
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      return false; // Falha no login devido a um erro
    }
  }

  logout() {
    // Remova o token de autenticação (se necessário)
    localStorage.removeItem("user");
  }

  isAuthenticated() {
    // Verifique se o usuário está autenticado com base no token (ou outras verificações)
    const token = localStorage.getItem("user");
    return !!token; // Retorna true se o token existir
  }
}

export default new AuthService();
