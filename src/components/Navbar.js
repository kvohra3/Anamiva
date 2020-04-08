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
} from '@material-ui/core';

export default function Navbar(props) {
  const { data } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'fixed',
      background: 'transparent',
      boxShadow: 'none',
      color: 'black',
      height: '5000px',
    },
    tab: {
      '&:hover': {
        backgroundColor: 'rgb(127, 81, 181, 0.42)',
      },
    },
    tabs_top: {
      background: 'transparent',
    },
    tabs_scroll: {
      background: 'white',
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
  };

  const getSubLeftContent = () => {
    const subLinkObj = data.leftContent.reduce((acc, cv, index) => {
      if (!cv.content) return acc;
      const links = cv.content.reduce((acc2, cv2) => {
        acc2.push({ ...cv2 });
        return acc2;
      }, []);
      acc[`left-${index}`] = links;
      return acc;
    }, {});
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
        <div className={classes[tabsStyle]}>
          <Tabs value={value} aria-label="simple tabs example">
            {leftContent}
            <Typography component="h1" variant="h3" align="center">
              {data.title}
            </Typography>
          </Tabs>
        </div>
        <Popper
          style={{ width: '100vw' }}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
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
