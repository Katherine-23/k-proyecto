import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  // Si existe el elemento #root, usa createRoot desde react-dom/client
  const root = createRoot(rootElement);
  root.render(
    <Router>
      <App />
    </Router>
  );
} else {
  console.error("Element with id 'root' not found.");
}
