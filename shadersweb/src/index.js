import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import CanvasWidget from './components/Canvas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div id="title">
    <App />
    <CanvasWidget />
  </div>
);

