import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';

const routes = [
  {
    path: '/',
    page: <Home />,
  },
  {
    path: '/quiz',
    page: <Quiz />,
  },
];

function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          {routes.map((route) => (
            <Route exact path={route.path}>
              {route.page}
            </Route>
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
