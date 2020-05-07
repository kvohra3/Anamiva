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
  IconButton,
  Popper,
  MenuList,
  MenuItem,
} from '@material-ui/core';

import {
  Store,
  Event,
  ArrowDropDownOutlined,
  AccountCircleOutlined,
  WorkOutlineOutlined,
} from '@material-ui/icons';

const allIcons = {
  acctBox: <AccountCircleOutlined />,
  shopCart: <WorkOutlineOutlined />,
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
    fontSize: '36px',
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
  tabText: {
    color: 'black',
    fontWeight: 500,
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    '&:hover': {
      color: '#8064f1',
    },
  },
  tabTextRight: {
    color: 'black',
    fontWeight: 500,
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    '&:hover': {
      color: '#F1BF1A',
    },
  },
  shopText: {
    color: 'black',
    fontWeight: 800,
    width: '100%',
    height: '100%',
    position: 'absolute',
    background: '#F1BF1A',
  },
  shopTab: {
    height: '100%',
    width: '180px',
  },
  tab: {
    textTransform: 'none',
    'min-width': '0px',
    height: '72px',
  },
  tabs: {
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
  menuItemContainer: {
    '&:hover': {
      background:
        'linear-gradient(to right, #f1bf1a -0.45%, #ff6361 48.94%, #8064f1 100.44%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    },
  },
  menuItem: {
    fontSize: '14px',
    fontWeight: 500,
    textAlign: 'center',
    display: 'inline-block',
  },
  ticker: {
    textAlign: 'center',
    backgroundColor: 'black',
    'min-height': '44px',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
  },
  popper: {},
}));

export default function Navbar(props) {
  const { data } = props;

  const classes = useStyles();

  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(true);
  const [listItems, setItems] = useState(null);
  const [navPosition, setNavPosition] = useState('relative');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setValue(null);
    setItems(null);
    setAnchorEl(null);
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

    setAnchorEl(currentTarget);
    setItems(listItems);
    setOpen(true);
    setValue(id);
  };

  const leftContent = data.leftContent.map((c, index) => {
    const label = c.arrowDropDown ? (
      <IconButton size="small" className={classes.tabText}>
        {c.title}
        <ArrowDropDownOutlined
          id={`icon-arrowdown-${index}`}
          fontSize="inherit"
          color="inherit"
          className={classes.tabIcon}
          style={{
            '&:before': { display: 'inital' },
            'padding-top': '2px',
            'padding-left': '10px',
          }}
        />
      </IconButton>
    ) : (
      <IconButton size="small" className={classes.tabText}>
        {c.title}
      </IconButton>
    );
    return (
      <Tab
        id={`left-${index}`}
        onMouseEnter={handleOpen}
        key={`left-${index}`}
        label={label}
        title={c.title}
        href={c.url ? c.url : null}
        className={classes.tab}
      />
    );
  });

  const rightContent = data.rightContent.map((c, index) => {
    const label = c.icon ? (
      <IconButton size="small" className={classes.tabTextRight}>
        {allIcons[c.icon]}
      </IconButton>
    ) : (
      <IconButton size="small" className={classes.shopText}>
        {c.title}
      </IconButton>
    );
    return (
      <Tab
        id={`right-${index}`}
        onMouseEnter={handleOpen}
        key={`right-${index}`}
        label={label}
        title={c.title}
        href={c.url ? c.url : null}
        className={c.id ? classes.shopTab : classes.tab}
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

    const onHover = (e) => {
      console.log('$$ hover e', e);
    };
    window.addEventListener('hover', onHover);
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [navPosition]);

  return (
    <div>
      <div className={classes.ticker}>
        <Typography
          component="p"
          style={{
            color: 'white',
            fontSize: '14px',
            'letter-spacing': '0.16em',
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
          <Toolbar className={classes.tabs}>
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
                <IconButton>
                  <Typography
                    component="a"
                    href="/"
                    className={classes.navtitle}
                  >
                    {data.title}
                  </Typography>
                </IconButton>
              </Grid>
              <Grid container xs item>
                <Tabs value={value}>
                  <div>{rightContent}</div>
                </Tabs>
              </Grid>
            </Grid>
          </Toolbar>
          <Popper
            open={open}
            anchorEl={anchorEl}
            placement="bottom"
            className={classes.popper}
            id="menu-list-grow"
          >
            <div style={listItems ? {} : { display: 'none' }}>
              <Paper>
                <MenuList>
                  {listItems
                    ? listItems.map((d) => {
                        return (
                          <MenuItem
                            className={classes.menuItemContainer}
                            onClick={handleClose}
                          >
                            {' '}
                            <div>
                              <Typography
                                component="h4"
                                variant="h4"
                                className={classes.menuItem}
                              >
                                {d.title}
                              </Typography>
                            </div>
                          </MenuItem>
                        );
                      })
                    : null}
                </MenuList>
              </Paper>
            </div>
          </Popper>
        </AppBar>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  data: PropTypes.object,
};
