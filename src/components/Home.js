import React from 'react';
import './Home.css';


import { Link } from 'react-router-dom';


const Home = () => {
  const userName = localStorage.getItem("userName");

  return (
    <div className="home-container">
      <h1 className="title">Bem-vindo, {userName}!</h1>
      <p className="subheading">Escolha uma opção abaixo:</p>

      <div className="menu">
        <ul>
          <li>
            <Link to="/lembrentes">Lembretes</Link>
          </li>
          <li>
            <Link to="/pirata">Pirata</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
