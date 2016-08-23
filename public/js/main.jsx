// main.js
import React from 'react';
import { render } from 'react-dom';
import BowerComponentsList from "./components/BowerComponents.jsx"

render(
  <div>
      <BowerComponentsList />
  </div>,
  document.getElementById('app')
);
