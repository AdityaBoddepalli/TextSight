import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './components/Home';
import Translate from './components/Translate';
import Sentiment from './components/Sentiment';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="translate" element={<Translate />} />
          <Route path="sentiment" element={<Sentiment />} />
          {/* Define more routes here */}
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);