import React from 'react';

import './App.css';
import { Timer } from './components/Timer';

function App() {
  return <div>
    <Timer cityCountry="Toronto" />
    <Timer cityCountry="New York" />
    <Timer cityCountry="Yekaterinburg" />
    <Timer cityCountry="Japan" />
    <Timer cityCountry="Israel" />
  </div>
}

export default App;
