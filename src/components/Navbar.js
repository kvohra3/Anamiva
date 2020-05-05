import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Tabs,
  Tab,
  Paper,
  Container,
  Toolbar,
  Grid,
  Typography,
} from '@material-ui/core';

import { AccountBox, ShoppingCart, Store, Event } from '@material-ui/icons';
const allIcons = {
  acctBox: <AccountBox />,
  shopCart: <ShoppingCart />,
  store: <Store />,
  event: <Event />,
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'transparent',
    boxShadow: 'none',
    color: 'black',
  },
  navtitle: {
    fontSize: '25px',
    fontWeight: '600',
    background:
      'linear-gradient(to right, #f1bf1a -0.45%, #ff6361 48.94%, #8064f1 100.44%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
  menuContainer: {
    borderRadius: '0px',
    borderTop: 'thin solid black',
  },
  tab: {
    color: 'black',
    textTransform: 'none',
    '&:hover': {
      background:
        'linear-gradient(to right, #f1bf1a -0.45%, #ff6361 48.94%, #8064f1 100.44%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    },
    'min-width': '0px',
  },
  tabs_top: {
    background: 'transparent',
    transition: 'background-color 0.5s ease',
  },
  tabs_scroll: {
    background: 'white',
    transition: 'background-color 0.5s ease',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Zapfino',
    fontSize: '185%',
  },
  menuPaper: {
    borderRadius: '0px',
    height: '10vw',
    display: 'flex',
    margin: 'auto',
  },
  menuItem: {
    fontSize: 'larger',
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'inline-block',
    '&:hover': {
      borderBottom: '2px solid #F1BF1A',
    },
  },
  ticker: {
    textAlign: 'center',
    backgroundColor: 'black',
  },
}));

export default function Navbar(props) {
  const { data } = props;

  const classes = useStyles();

  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(true);
  const [listItems, setItems] = useState(null);
  const [navPosition, setNavPosition] = useState('relative');

  const handleClose = () => {
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

  useEffect(() => {
    const onScroll = (e) => {
      if (e.target.documentElement.scrollTop > 24) {
        setNavPosition('fixed');
      } else {
        setNavPosition('relative');
      }
      console.log('$$ scrollTop', e.target.documentElement.scrollTop);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [navPosition]);

  return (
    <div>
      <div className={classes.ticker}>
        <Typography
          component="span"
          gutterBottom
          style={{
            color: 'white',
          }}
        >
          {data.ticker}
        </Typography>
      </div>
      <div
        className={classes.page}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        <AppBar className={classes.root} style={{ position: navPosition }}>
          <Toolbar className={classes.tabs_scroll}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid container justify="flex-end" xs item>
                <Tabs value={value}>
                  <div>{leftContent}</div>
                </Tabs>
              </Grid>
              <Grid xs style={{ textAlign: 'center' }}>
                <Typography component="a" href="/" className={classes.navtitle}>
                  {data.title}
                </Typography>
              </Grid>
              <Grid container xs item>
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
              <div style={listItems ? {} : { display: 'none' }}>
                <Paper elevation={3} className={classes.menuPaper}>
                  <Container
                    style={{
                      margin: 'auto',
                      textAlign: 'center',
                      width: '50%',
                    }}
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
                                    margin: 'auto',
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
    </div>
  );
}

Navbar.propTypes = {
  data: PropTypes.object,
};
