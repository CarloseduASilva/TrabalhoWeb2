import React, { useState } from 'react';

const Pirata = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const translateText = async () => {
    if (!inputText.trim()) {
      setErrorMessage('Por favor, digite um texto para traduzir.');
      return;
    }

    setErrorMessage(''); // Limpa a mensagem de erro antes de tentar novamente
    try {
      const response = await fetch('https://api.funtranslations.com/translate/pirate.json', {
        method: 'POST',
        headers: {
          // Se você tiver uma chave de API, adicione-a aqui
          // 'X-FunTranslations-Api-Secret': '<sua-chave-api>'
        },
        body: new URLSearchParams({
          text: inputText
        })
      });

      // Verificando se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }

      const data = await response.json();

      if (data && data.contents && data.contents.translated) {
        setTranslatedText(data.contents.translated);
      } else {
        setTranslatedText('');
        setErrorMessage('Erro: Tradução não disponível.');
      }
    } catch (error) {
      console.error('Erro ao chamar a API:', error);
      setTranslatedText('');
      setErrorMessage('Erro: Não foi possível conectar à API.');
    }
  };

  return (
    <div>
      <h1>Tradutor Pirata</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Digite seu texto aqui"
      />
      <button onClick={translateText}>Traduzir</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <h2>Texto Traduzido:</h2>
      <p>{translatedText}</p>
    </div>
  );
};

export default Pirata;