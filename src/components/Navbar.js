import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  Toolbar,
  Grid,
} from '@material-ui/core';

export default function Navbar(props) {
  const { data } = props;

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
      transtion: '2ms all',
    },
    tabs_scroll: {
      background: 'white',
      transtion: '2ms all',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    popper: {
      width: '100%',
    },
  }));
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
        href={c.url ? c.url : null}
        className={classes.tab}
      />
    );
  });

  const rightContent = data.rightContent.map((c, index) => {
    return (
      <Tab
        id={`right-${index}`}
        onMouseEnter={handleOpen}
        key={`right-${index}`}
        label={c.title}
        href={c.url ? c.url : null}
        className={classes.tab}
      />
    );
  });

  const listenScrollEvent = () => {
    window.scrollY > 10
      ? setTabsStyle('tabs_scroll')
      : setTabsStyle('tabs_top');
  };
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  });

  return (
    <div onMouseLeave={handleClose}>
      <AppBar position="sticky" className={classes.root}>
        <Toolbar className={classes[tabsStyle]}>
          <Grid justify={'space-between'} container>
            <Grid xs={3} item>
              <Tabs value={value}>
                <div>{leftContent}</div>
              </Tabs>
            </Grid>
            <Grid xs={3} item>
              <Typography component="h1" variant="h3" className={classes.title}>
                {data.title}
              </Typography>
            </Grid>
            <Grid xs={3} item>
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
