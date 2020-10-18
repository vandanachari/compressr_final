import React from 'react'
import './App.css'
import Nav from './Nav'
import Home from './Home'
import Demo from './Demo'
import TryItOut from './TryItOut'
import About from './About'
import {BrowserRouter as Router, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className = "App">
        <Nav/>
        <Switch>
          <Home path="/" exact component={Home}/>
          <Demo path="/demo" exact component={Demo}/>
          <TryItOut path="/tryitout" exact component={TryItOut}/>
          <About path="/about" exact component={About}/>
        </Switch>
      </div>
    </Router>




  );
}


export default App;
