// src/App.js
import React from 'react';
import './App.css';
import Login from './Login'; // Importe o componente de login

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Renderize o componente de login */}
        <Login />
      </header>
    </div>
  );
}

export default App;
