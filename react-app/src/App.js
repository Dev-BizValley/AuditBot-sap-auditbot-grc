import React from 'react';
import './App.css';
import Application from './container/Application'
import  {BrowserRouter} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Application/>
    </div>
    </BrowserRouter>
  );
}

export default App;
