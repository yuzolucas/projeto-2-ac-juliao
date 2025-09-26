import React from 'react';
import './light.css';

const Light = ({ color }) => {
  return <div className={`light-bulb ${color}`}></div>;
};

export default Light;