import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

const Home = props => (
  <div>
    <h1> Homepage </h1>
    <Route path="/taco" component={props => <small>theres a taco</small>} />
  </div>
);
const About = props => (
  <h1>You already know everything about me you need to know... So go away </h1>
);
const NotFound = props => (
  <h1>{`${props.location.pathname} is not a valid route for this app.`}</h1>
);

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={Home} />
          <Route exact path="/about" component={About} />
          {/* this is a 404 handler */}
          {/* <Route component={NotFound} /> */}

          {/* Below is a redirect back home */}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
