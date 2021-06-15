import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
// import LiveFeed from './LiveFeed';

export default function Main() {
  return (
    <>
      <Switch>
        <Route 
          exact path="/" 
          component={Home}
        />
        <Route 
          exact path="/register" 
          component={Register}
        />
        <Route 
          exact path="/login" 
          component={Login}
        />
        {/* <Route exact path="/livefeed/:userid" 
        render={props => 
          isAuthenticated ? (
            <LiveFeed {...props}/>
          ) : (
            <Redirect to="/login"/>
          )
        }/>
        <Route path="*" component={Error}/> */}
      </Switch>
    </>
  )
}
