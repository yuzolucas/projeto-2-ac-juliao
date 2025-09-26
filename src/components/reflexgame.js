import React, { useState, useEffect } from 'react';
import Light from './light';
import './reflexgame.css';

const TOTAL_LIGHTS = 5;

const ReflexGame = () => {
  const [phase, setPhase] = useState('parado');
  const [litLights, setLitLights] = useState(0);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    let timer;
    if (phase === 'acendendo' && litLights < TOTAL_LIGHTS) {
      timer = setTimeout(() => {
        setLitLights(prevLitLights => prevLitLights + 1);
      }, 1000);
    } else if (phase === 'acendendo' && litLights === TOTAL_LIGHTS) {
      timer = setTimeout(() => {
        setPhase('go');
      }, 1500 + Math.random() * 2000);
    }
    return () => clearTimeout(timer);
  }, [phase, litLights]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (phase === 'go') {
        const key = event.key.toLowerCase();
        if (key === 'w' || key === 'i') {
          handlePlayerClick(key === 'w' ? 'player1' : 'player2');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [phase]);

  const handlePlayerClick = (player) => {
    const winningPlayerName = player === 'player1' ? 'Jogador 1' : 'Jogador 2';
    setWinner(winningPlayerName);
    setScores(prevScores => ({
      ...prevScores,
      [player]: prevScores[player] + 1,
    }));
    setPhase('venceu');
  };

  const handleStartGame = () => {
    setPhase('acendendo');
    setLitLights(0);
    setWinner(null);
  };

  const renderLights = () => {
    const lights = [];
    for (let i = 0; i < TOTAL_LIGHTS; i++) {
      let color = '';
      if (phase === 'acendendo' && i < litLights) {
        color = 'red';
      } else if (phase === 'go' || phase === 'venceu') {
        color = 'green';
      }
      lights.push(<Light key={i} color={color} />);
    }
    return lights;
  };

  return (
    <div className="game-container">
      <h1>Jogo de Reflexo</h1>
      <div className="scoreboard">
        <h2>Placar</h2>
        <p>Jogador 1: {scores.player1}</p>
        <p>Jogador 2: {scores.player2}</p>
      </div>

      <div className="lights-container">
        {renderLights()}
      </div>

      {phase === 'go' && <h2 className="go-text">GO!</h2>}

      {phase === 'venceu' && (
        <div className="message-container">
          <h2 className="winner-text">{winner} venceu!</h2>
          <button onClick={handleStartGame}>Próxima Rodada</button>
        </div>
      )}

      {phase === 'parado' && (
        <button onClick={handleStartGame}>Iniciar Jogo</button>
      )}

      {(phase === 'acendendo' || phase === 'go') && (
        <p className="instruction-text">
          Jogador 1: Pressione W | Jogador 2: Pressione I
        </p>
      )}
    </div>
  );
};

export default ReflexGame;