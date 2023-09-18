import React, { useState } from "react";
import { login, isAuthenticated } from "../services/AuthService";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleLogin = async () => {
    const loggedIn = await login(username, password);
    console.log(username, password)
    
    if (loggedIn && isAuthenticated()) {
      alert(`Usuário logado`);
      router.push('/');
    } else {
      alert("Login falhou");
    }
  };

  return (
    <div className="row">
      <div
        className="col-md-6 p-0"
        style={{ backgroundColor: "#D8F3DC", height: "100vh" }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <h1
            style={{
              color: "black",
              fontSize: 50,
              fontFamily: "Inter",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            A R B O R E T T O
          </h1>
          <img
            src="/logo.png"
            alt="Logo(Árvore)"
            width="600"
            height="800"
            style={{
              right: "0",
              top: "10px",
              position: "relative",
              display: "flex",
            }}
          />
          {/* <div style={{width: 648.01, height: 0, border: '0.50px rgba(170, 170, 170, 0.80) solid'}}></div> */}
        </div>
      </div>
      <div className="col-md-6">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div>
            <h2 className="mb-3" style={{ textAlign: "center" }}>
              Iniciar sessão
            </h2>
            <input
              type="text"
              className="form-control mb-2"
              style={{
                width: 393,
                height: 69,
                background: "#E7E7E7",
                borderRadius: 22,
                border: "none",
                textAlign: "center",
              }}
              placeholder="Informe seu CPF"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-2"
              style={{
                width: 393,
                height: 69,
                background: "#E7E7E7",
                borderRadius: 22,
                border: "none",
                textAlign: "center",
              }}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary"
                style={{
                  width: "320.70px",
                  height: "56.70px",
                  background: "#4EB68B",
                  borderRadius: "19px",
                  border: "none",
                }}
                onClick={handleLogin}
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
