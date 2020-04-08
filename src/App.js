import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
      <Switch>
        {routes.map((route) => (
          <Route exact path={route.path}>
            {route.page}
          </Route>
        ))}
      </Switch>
    </Router>
  );
}

export default App;
