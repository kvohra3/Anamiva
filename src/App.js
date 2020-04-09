import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('$$ using effect');
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
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
