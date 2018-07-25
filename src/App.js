import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100); // fake async
  }
};

// Different Routes

const Home = props => (
  <div>
    <h1>Welcome Home</h1>
  </div>
);
const About = props => (
  <h1>You already know everything about me you need to know... So go away </h1>
);

const Login = props => (
  <div>
    <h1>Login</h1>
  </div>
);

const NotFound = props => (
  <h1>{`${props.location.pathname} is not a valid route for this app.`}</h1>
);

// Our custom PrivateRoute component

const PrivateRoute = props => {
  if (fakeAuth.isAuthenticated) {
    // go to props.component
  } else {
    // redirect back to /login
  }
};

// Main App

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* The exact prop is necessary for home so it doesn't match all the other paths */}
          <Route exact path="/" component={Home} />
          {/* exact prop for /about is not necessary unless there are other /about/something routes */}
          <Route exact path="/about" component={About} />
          {/* this is a 404 handler */}
          {/* <Route component={NotFound} /> */}
          <Route exact path="/login" component={Login} />
          {/* Below is a redirect back home; this has to be at the bottom as a catch-all */}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
