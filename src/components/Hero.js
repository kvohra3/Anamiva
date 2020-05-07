import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Link, Button } from '@material-ui/core';
import TextLoop from 'react-text-loop';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const useStyles = makeStyles((theme) => ({
  mainFeatured: {
    position: 'relative',
    backgroundColor: '#F8F8F8',
    paddingTop: '100px',
    paddingBottom: '150px',
  },
  mainFeaturedContent: {
    margin: 0,
    textAlign: 'center',
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  link: {
    position: 'relative',
    fontWeight: 'bold',
    fontSize: '18px',
    fontWeight: 800,
    color: 'black',
    '&:hover': {
      color: '#8064f1',
      background:
        'linear-gradient(to right, #f1bf1a -0.45%, #ff6361 48.94%, #8064f1 100.44%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    },
  },
  linkIcon: {
    position: 'absolute',
    top: '-17%',
  },
  heroText: {
    fontWeight: 800,
  },
  button: {
    width: '220px',
    height: '56px',
    textAlign: 'center',
    textTransform: 'none',
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      background:
        'linear-gradient(to right, #f1bf1a -0.45%, #ff6361 48.94%, #8064f1 100.44%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    },
  },
  items: {
    padding: '15px',
  },
  textCarosuelContainer: {
    display: 'inline',
  },
  textCarosuel: {
    fontWeight: 800,
    background:
      'linear-gradient(to right, #f1bf1a -0.45%, #ff6361 48.94%, #8064f1 100.44%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
}));

export default function Hero(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <Paper elevation={0} className={classes.mainFeatured}>
      <Grid container spacing={3} direction="column" justify="center">
        <div className={classes.mainFeaturedContent}>
          <Grid className={classes.items} xs item>
            <Typography
              component="h1"
              variant="h2"
              color="inherit"
              gutterBottom
              className={classes.heroText}
            >
              {data.title}
            </Typography>
          </Grid>
          <Grid className={classes.items} xs item>
            <Typography
              component="span"
              variant="h2"
              color="inherit"
              gutterBottom
              className={classes.heroText}
            >
              {data.textCarosuelPrefix}
            </Typography>
            <TextLoop
              springConfig={{ stiffness: 180, damping: 8 }}
              adjustingSpeed={1000}
              mask={true}
              fade={false}
            >
              {data.textCarosuel.map((text) => (
                <Typography
                  component="h1"
                  variant="h2"
                  color="inherit"
                  gutterBottom
                  className={classes.textCarosuel}
                >
                  {text}
                </Typography>
              ))}
            </TextLoop>
          </Grid>
          <Grid className={classes.items} xs item>
            <Button
              className={classes.button}
              variant="contained"
              href={data.button.url}
            >
              <Typography
                component="p"
                variant="h5"
                color="inherit"
                gutterBottom
              >
                {data.button.title}
              </Typography>
            </Button>
          </Grid>
          <Grid className={classes.items} xs item>
            <Link
              className={classes.link}
              underline="none"
              variant="h6"
              href={data.link.url}
            >
              {data.link.title}
              <ArrowRightAltIcon
                fontSize="large"
                className={classes.linkIcon}
              />
            </Link>
          </Grid>
        </div>
      </Grid>
    </Paper>
  );
}

Hero.propTypes = {
  data: PropTypes.object,
};
