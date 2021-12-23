import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <div className="App">
      App home
      <Outlet />
    </div>
  );
}

export default App;
