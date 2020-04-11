import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Tabs,
  Tab,
  Paper,
  Container,
  Toolbar,
  Grid,
  Typography,
} from "@material-ui/core";
import logo from "../images/Anamiva_Logo.png";

import { AccountBox, ShoppingCart, Store, Event } from "@material-ui/icons";
const allIcons = {
  acctBox: <AccountBox />,
  shopCart: <ShoppingCart />,
  store: <Store />,
  event: <Event />,
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    background: "transparent",
    boxShadow: "none",
    color: "black",
  },
  menuContainer: {
    borderRadius: "0px",
    borderTop: "thin solid black",
  },
  tab: {
    fontFamily: "Future Bold",
    textTransform: "none",
    fontSize: "large",
    "&:hover": {
      borderBottom: "2px solid #F1BF1A",
    },
    "min-width": "0px",
  },
  tabs_top: {
    background: "transparent",
    transition: "background-color 0.5s ease",
  },
  tabs_scroll: {
    background: "white",
    transition: "background-color 0.5s ease",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Zapfino",
    fontSize: "185%",
  },
  logo: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    width: "25%%",
    height: "48px",
  },
  menuPaper: {
    borderRadius: "0px",
    height: "10vw",
    display: "flex",
    margin: "auto",
  },
  menuItem: {
    fontSize: "larger",
    fontWeight: "bold",
    textAlign: "center",
    "&:hover": {
      textDecoration: "underline #F1BF1A",
    },
  },
}));

export default function Navbar(props) {
  const { data } = props;

  const classes = useStyles();

  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(true);
  const [listItems, setItems] = useState(null);

  const handleClose = (event) => {
    setOpen(false);
    setValue(null);
    setItems(null);
  };

  const getSubLeftContent = () => {
    const subLinkObj = {};

    data.leftContent.reduce((acc, cv, index) => {
      if (!cv.content) return acc;
      const links = cv.content.reduce((acc2, cv2) => {
        acc2.push({ ...cv2 });
        return acc2;
      }, []);
      acc[`left-${index}`] = links;
      return acc;
    }, subLinkObj);

    data.rightContent.reduce((acc, cv, index) => {
      if (!cv.content) return acc;
      const links = cv.content.reduce((acc2, cv2) => {
        acc2.push({ ...cv2 });
        return acc2;
      }, []);
      acc[`right-${index}`] = links;
      return acc;
    }, subLinkObj);

    return subLinkObj;
  };

  const subLinkObj = getSubLeftContent();

  const handleOpen = (event) => {
    const { currentTarget } = event;
    const id = currentTarget.id;
    const listItems = subLinkObj[id];

    setItems(listItems);
    setOpen(true);
    setValue(id);
  };

  const leftContent = data.leftContent.map((c, index) => {
    return (
      <Tab
        id={`left-${index}`}
        onMouseEnter={handleOpen}
        key={`left-${index}`}
        label={c.title}
        title={c.title}
        href={c.url ? c.url : null}
        className={classes.tab}
      />
    );
  });

  const rightContent = data.rightContent.map((c, index) => {
    if (c.icon) {
      return (
        <Tab
          id={`right-${index}`}
          onMouseEnter={handleOpen}
          key={`right-${index}`}
          icon={allIcons[c.icon]}
          title={c.title}
          href={c.url ? c.url : null}
          className={classes.tab}
        />
      );
    }
    return (
      <Tab
        id={`right-${index}`}
        onMouseEnter={handleOpen}
        key={`right-${index}`}
        label={c.title}
        title={c.title}
        href={c.url ? c.url : null}
        className={classes.tab}
      />
    );
  });

  return (
    <div
      className={classes.page}
      onMouseEnter={handleOpen}
      // onMouseLeave={handleClose}
    >
      <AppBar position="sticky" className={classes.root}>
        <Toolbar className={classes.tabs_scroll}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid container justify="space-evenly" alignItems="center" xs item>
              <Tabs value={value} style={{ width: "100%" }}>
                <div>{leftContent}</div>
              </Tabs>
            </Grid>
            <Grid xs item>
              <img src={logo} alt="Anamiva" className={classes.logo} />
            </Grid>
            <Grid container justify="flex-end" xs item>
              <Tabs value={value}>
                <div>{rightContent}</div>
              </Tabs>
            </Grid>
          </Grid>
        </Toolbar>
        <Typography
          component="div"
          className={classes.menuContainer}
          hidden={!open}
        >
          {open && (
            <div style={listItems ? {} : { display: "none" }}>
              <Paper elevation={3} className={classes.menuPaper}>
                <Container
                  style={{ margin: "auto", textAlign: "center", width: "50%" }}
                >
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    {listItems
                      ? listItems.map((d, i) => {
                          return (
                            <Grid item xs onClick={handleClose}>
                              <div
                                style={{
                                  margin: "auto",
                                }}
                              >
                                <Typography
                                  component="h4"
                                  variant="h4"
                                  className={classes.menuItem}
                                >
                                  {d.title}
                                </Typography>
                              </div>
                            </Grid>
                          );
                        })
                      : null}
                  </Grid>
                </Container>
              </Paper>
            </div>
          )}
        </Typography>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  data: PropTypes.object,
};
