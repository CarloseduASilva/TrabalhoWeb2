import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Lembrete.css'; // Estilos CSS

const Lembretes = () => {
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]); // Estado para favoritos
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para tema escuro/claro

  // Função para buscar o conselho da API
  const fetchAdvice = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://api.adviceslip.com/advice');
      setAdvice(response.data.slip.advice);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar conselho:", error);
      setAdvice("Ocorreu um erro. Tente novamente.");
      setIsLoading(false);
    }
  };

  // Função para salvar o conselho nos favoritos
  const saveToFavorites = () => {
    if (advice && !favorites.includes(advice)) {
      setFavorites((prevFavorites) => [...prevFavorites, advice]);
    }
  };

  // Função para alternar o tema
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Chama a API ao montar o componente
  useEffect(() => {
    fetchAdvice();
  }, []);

  // Recupera o nome do usuário armazenado no localStorage
  const userName = localStorage.getItem("userName");

  return (
    <div className={`home-container ${isDarkMode ? 'dark' : 'light'}`}>
      <h1 className="title">Bem-vindo, {userName}!</h1>
      <p className="subheading">Receba o seu conselho diário.</p>
      <div className="advice-card">
        {isLoading ? (
          <p className="loading">Carregando...</p>
        ) : (
          <p className="advice-text">"{advice}"</p>
        )}
      </div>
      <button className="new-advice-btn" onClick={fetchAdvice}>
        Obter Novo Conselho
      </button>
      <button className="save-btn" onClick={saveToFavorites}>
        Salvar no Favorito
      </button>
      <div className="favorite-advice">
        <h2>Conselhos Favoritos</h2>
        <ul>
          {favorites.length > 0 ? (
            favorites.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          ) : (
            <p>Você ainda não tem conselhos favoritos.</p>
          )}
        </ul>
      </div>
      <button className="theme-btn" onClick={toggleTheme}>
        {isDarkMode ? "Mudar para Claro" : "Mudar para Escuro"}
      </button>
    </div>
  );
};

export default Lembretes;
