import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Lembretes from './components/Lembretes'; // Página de Lembretes
import Pirata from './components/Pirata'; // Página de Pirata
import "./App.css";

const API_URL = "http://localhost:5000/api"; // Endereço do backend

const App = () => {
  const [formType, setFormType] = useState("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(password)) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres, incluindo letras e números.");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const endpoint = formType === "login" ? "/login" : "/register";
      const response = await axios.post(`${API_URL}${endpoint}`, { nome, email, password });

      setMessage(response.data.message || "Operação realizada com sucesso!");

      if (formType === "login") {
        localStorage.setItem("userName", response.data.userName);
        navigate("/home");
      } else if (formType === "register") {
        localStorage.setItem("userName", nome);
        navigate("/home");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <div className="container">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/lembrentes" element={<Lembretes />} /> {/* Lembretes */}
        <Route path="/pirata" element={<Pirata />} /> {/* Pirata */}
        <Route
          path="/"
          element={
            <div>
              <h1>{formType === "login" ? "Login" : "Cadastro"}</h1>
              <form onSubmit={handleSubmit}>
                {formType === "register" && (
                  <div className="form-group">
                    <label>Nome:</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Senha:</label>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {passwordError && <p className="error">{passwordError}</p>}
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? "Ocultar" : "Mostrar"} senha
                  </button>
                </div>
                <button type="submit">
                  {formType === "login" ? "Entrar" : "Cadastrar"}
                </button>
              </form>
              <p>{message}</p>
              <button onClick={() => setFormType(formType === "login" ? "register" : "login")}>
                {formType === "login"
                  ? "Não tem uma conta? Cadastre-se"
                  : "Já tem uma conta? Faça login"}
              </button>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
