import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";

const routes = [
  {
    path: "/",
    page: <Home />,
  },
  {
    path: "/quiz",
    page: <Quiz />,
  },
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("$$ using effect");
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

let theme = createMuiTheme({
  typography: {
    fontFamily: "Georgia",
    h1: {
      fontFamily: "Georgia",
    },
    h2: {
      fontFamily: "Georgia",
    },
    h3: {
      fontFamily: "Georgia",
    },
    h4: {
      fontFamily: "Georgia",
    },
    h5: {
      fontFamily: "Georgia",
    },
    h6: {
      fontFamily: "Georgia",
    },
    subtitle1: {
      fontFamily: "Georgia",
    },
    subtitle2: {
      fontFamily: "Georgia",
    },
    body1: {
      fontFamily: "Georgia",
    },
    body2: {
      fontFamily: "Georgia",
    },
    button: {
      fontFamily: "Georgia",
    },
    caption: {
      fontFamily: "Georgia",
    },
    overline: {
      fontFamily: "Georgia",
    },
  },
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
