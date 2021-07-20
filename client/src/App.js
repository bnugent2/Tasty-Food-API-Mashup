import React from 'react';
import './App.css';
import Home from './Pages/Home.jsx';
import Details from './Pages/Details';
import Footer from './Components/Footer';
import Map from './Components/Map';
import Error from'./Errors/Error';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/recipe/:id" component={Details}/>
        <Route path="/map" exact component={Map}/>
        <Route component={Error} message="404 Page not Found"/>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
