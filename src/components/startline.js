import React, { useState, useEffect } from 'react';
import Light from './light';
import './startline.css';

const TOTAL_LIGHTS = 5;

const StartLine = () => {
  const [phase, setPhase] = useState('parado');
  const [litLights, setLitLights] = useState(0);

  useEffect(() => {
    let timer;

    if (phase === 'acendendo' && litLights < TOTAL_LIGHTS) {
      timer = setTimeout(() => {
        setLitLights(prevLitLights => prevLitLights + 1);
      }, 1000);
    } else if (phase === 'acendendo' && litLights === TOTAL_LIGHTS) {
      timer = setTimeout(() => {
        setPhase('go');
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [phase, litLights]);

  const handleStartRace = () => {
    setPhase('acendendo');
    setLitLights(0);
  };

  const renderLights = () => {
    const lights = [];
    for (let i = 0; i < TOTAL_LIGHTS; i++) {
      let color = '';
      if (phase === 'acendendo' && i < litLights) {
        color = 'red';
      } else if (phase === 'go') {
        color = 'green';
      }
      lights.push(<Light key={i} color={color} />);
    }
    return lights;
  };

  return (
    <div className="start-line-container">
      <h1>Largada de Corrida</h1>
      <div className="lights-container">
        {renderLights()}
      </div>
      {phase === 'go' && <h2 className="go-text">GO!</h2>}
      <button onClick={handleStartRace} disabled={phase === 'acendendo'}>
        Iniciar Corrida
      </button>
    </div>
  );
};

export default StartLine;