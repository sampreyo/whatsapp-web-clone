import React from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import Chat from './Chat';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
import {useStateProviderValue} from "./StateProvider";
function App() {
  const[{user},setUser]=useStateProviderValue();
  return (
    
                   
    <div className="app"> 
    {!user?(
      <Login/>
    ):(<div className="app_body">
    <Router>
    <Sidebar/>
      <Switch>
    
    <Route path="/rooms/:roomId">
    <Chat/>
    </Route>
    
    </Switch>
    </Router>
  </div>)} 
</div> 
      
    
  );
}

export default App;
