import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Asegúrate de que tienes estilos globales definidos aquí
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
