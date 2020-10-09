import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginForm from './components/Login/LoginForm';
import Home from '././components/Home/Home'
import { BrowserRouter, Route } from 'react-router-dom'
import Game from './components/Game'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
          <Route exact={true} path="/" component={LoginForm}/>
          <Route exact={true} path="/minesweeper" component={Home} />
          <Route path="/minesweeper/game/:id" component={Game} />
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);