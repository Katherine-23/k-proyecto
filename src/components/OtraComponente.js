// OtraComponente.js
import React from 'react';
import HomeContainer from './HomeContainer'; 

function OtraComponente() {
  return (
    <div>
      <h1>Otra página</h1>
      <HomeContainer /> {/* Renderiza la página Home dentro de OtraComponente */}
    </div>
  );
}

export default OtraComponente;
