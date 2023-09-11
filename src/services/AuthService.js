// auth.js (ou AuthService.js)
class AuthService {
    async login(cpf, password) {
      try {
        // Chame a API para autenticar o usuário (substitua 'apiEndpoint' pelo seu URL real)
        const response = await fetch('http://arborettoapi.azurewebsites.net/api-arboretto-dev/v1/usuario/login', {
          method: 'GET',
          headers: {
            "cpf":cpf, "senha":password
          },
          // body: JSON.stringify({ cpf, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Armazene o token de autenticação em localStorage ou cookies
          localStorage.setItem('token', data.token);
          return true; // Login bem-sucedido
        } else {
          return false; // Falha no login
        }
      } catch (error) {
        console.error('Erro ao autenticar:', error);
        return false; // Falha no login devido a um erro
      }
    }
  
    logout() {
      // Remova o token de autenticação (se necessário)
      localStorage.removeItem('token');
    }
  
    isAuthenticated() {
      // Verifique se o usuário está autenticado com base no token (ou outras verificações)
      const token = localStorage.getItem('token');
      return !!token; // Retorna true se o token existir
    }
  }
  
  export default new AuthService();
  