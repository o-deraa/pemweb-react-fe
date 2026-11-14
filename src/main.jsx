import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/sora';
import '@fontsource-variable/epilogue';
import App from './App.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
