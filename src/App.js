import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import './App.css';

const fakeAuth = {
  isAuthenticated: false,
  authenticate() {
    this.isAuthenticated = true;
  },
  logout() {
    this.isAuthenticated = false;
  }
};

// Different Routes

class Home extends Component {
  logout = () => {
    fakeAuth.logout();
    this.props.history.push('/'); // forcing a route change
  };

  render() {
    let loginOrLogout;

    if (fakeAuth.isAuthenticated) {
      loginOrLogout = <button onClick={this.logout}>Logout</button>;
    } else if (!fakeAuth.isAuthenticated) {
      loginOrLogout = (
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button>Click Here to Login</button>
        </Link>
      );
    }

    return (
      <div>
        <small>{`isAuthenticated: ${fakeAuth.isAuthenticated}`}</small>
        <h1>Welcome Home</h1>
        <Link to="/about" style={{ textDecoration: 'none' }}>
          <button>About</button>
        </Link>
        {loginOrLogout}
        <Link to="/protected" style={{ textDecoration: 'none' }}>
          <button>Go to Protected Route (Auth Required)</button>
        </Link>
      </div>
    );
  }
}

const About = props => (
  <div>
    <small>{`isAuthenticated: ${fakeAuth.isAuthenticated}`}</small>
    <h1>You already know everything about me you need to know... So go away</h1>
    <Link to="/" style={{ textDecoration: 'none' }}>
      <button>Go back home</button>
    </Link>
  </div>
);

class Login extends Component {
  login = () => {
    fakeAuth.authenticate();
    this.props.history.push('/protected'); // forcing a route change
  };
  render() {
    return (
      <div>
        <small>{`isAuthenticated: ${fakeAuth.isAuthenticated}`}</small>
        <h1>Login Page</h1>
        <br />
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

const NotFound = props => (
  <h1>{`${props.location.pathname} is not a valid route for this app.`}</h1>
);

// Our custom PrivateRoute component

/**
 * THIS IS A HOC
 *   from here -> https://tylermcginnis.com/react-router-protected-routes-authentication/
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        fakeAuth.isAuthenticated === true ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

class Protected extends Component {
  render() {
    return (
      <div>
        <small>{`isAuthenticated: ${fakeAuth.isAuthenticated}`}</small>
        <h1>This is a protected secret component.</h1>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button>Go Back Home</button>
        </Link>
      </div>
    );
  }
}

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
          <PrivateRoute exact path="/protected" component={Protected} />
          {/* Below is a redirect back home; this has to be at the bottom as a catch-all */}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
