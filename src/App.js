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
    fontFamily: "Futura",
    h1: {
      fontFamily: "Futura",
    },
    h2: {
      fontFamily: "Futura",
    },
    h3: {
      fontFamily: "Futura",
    },
    h4: {
      fontFamily: "Futura",
    },
    h5: {
      fontFamily: "Futura",
    },
    h6: {
      fontFamily: "Futura",
    },
    subtitle1: {
      fontFamily: "Futura",
    },
    subtitle2: {
      fontFamily: "Futura",
    },
    body1: {
      fontFamily: "Futura",
    },
    body2: {
      fontFamily: "Futura",
    },
    button: {
      fontFamily: "Futura",
    },
    caption: {
      fontFamily: "Futura",
    },
    overline: {
      fontFamily: "Futura",
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
