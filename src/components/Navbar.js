import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Tabs,
  Tab,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  Toolbar,
  Grid,
} from '@material-ui/core';
import logo from '../images/Anamiva_Logo.png';

import { AccountBox, ShoppingCart, Store, Event } from '@material-ui/icons';
const allIcons = {
  acctBox: <AccountBox />,
  shopCart: <ShoppingCart />,
  store: <Store />,
  event: <Event />,
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    background: 'transparent',
    boxShadow: 'none',
    color: 'black',
  },
  tab: {
    '&:hover': {
      backgroundColor: 'rgb(127, 81, 181, 0.42)',
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
  logo: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '25%%',
    height: '48px',
  },
}));

export default function Navbar(props) {
  const { data } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [listItems, setItems] = useState(null);
  const [tabsStyle, setTabsStyle] = useState('tabs_top');

  const handleClose = (event) => {
    setOpen(false);
    setValue(null);
    setAnchorEl(null);
    setItems(null);
    setTabsStyle('tabs_top');
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
    setAnchorEl(currentTarget);
    setTabsStyle('tabs_scroll');
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

  const listenScrollEvent = () => {
    window.scrollY > 10
      ? setTabsStyle('tabs_top')
      : setTabsStyle('tabs_scroll');
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  });

  return (
    <div onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <AppBar position="sticky" className={classes.root}>
        <Toolbar className={classes[tabsStyle]}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid container justify="flex-start" xs item>
              <Tabs value={value}>
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
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
          className={classes.popper}
          id="menu-list-grow"
        >
          <div style={listItems ? {} : { display: 'none' }}>
            <Paper>
              <MenuList>
                {listItems
                  ? listItems.map((d) => {
                      return (
                        <MenuItem onClick={handleClose}>{d.title}</MenuItem>
                      );
                    })
                  : null}
              </MenuList>
            </Paper>
          </div>
        </Popper>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  data: PropTypes.object,
};
