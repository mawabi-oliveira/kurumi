import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register';
import Game from './screens/Game';
import Navbar from './components/Navbar';

// O jogo é público (modo convidado). Login e cadastro são opcionais.
const App: React.FC = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/game" />} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/game" component={Game} />
      <Route render={() => <Redirect to="/game" />} />
    </Switch>
  </BrowserRouter>
);

export default App;
