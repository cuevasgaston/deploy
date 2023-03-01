import './App.css';
import { Route, Switch } from "react-router-dom";
import React from "react";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home.jsx';
import CreateVideogame from './components/CreateVideogame/CreateVideogame';
import VideogameDetail from './components/Detail/Detail';



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/videogame" component={CreateVideogame} />
        <Route exact path="/detail/:id" component={VideogameDetail} />
      </Switch>
    </div>
  );
}

export default App;
