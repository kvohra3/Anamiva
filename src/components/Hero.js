import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Link, Button } from '@material-ui/core';
import TextLoop from 'react-text-loop';

const useStyles = makeStyles((theme) => ({
  mainFeatured: {
    position: 'relative',
    color: theme.palette.common.white,
    // textAlign: 'center',
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    paddingTop: '100px',
    paddingBottom: '400px',
  },
  mainFeaturedContent: {
    textAlign: 'center',
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  link: {
    color: 'white',
  },
  button: {
    display: 'inline-block',
    padding: '0.825em',
    margin: '0 0.3em 0.3em 0',
    borderRadius: '2em',
    textDecoration: 'none',
    color: '#FFFFFF',
    backgroundColor: '#4eb5f1',
    textAlign: 'center',
    textTransform: 'capitalize',
    '&:hover': {
      'background-color': '#4095c6',
    },
  },
  items: {
    padding: '15px',
  },
  textCarosuel: {
    margin: '10px',
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
}));

export default function Hero(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <Paper
      elevation={0}
      className={classes.mainFeatured}
      style={{ backgroundImage: `url(${data.image})` }}
    >
      <Grid container spacing={3} direction="column" justify="center">
        <div className={classes.mainFeaturedContent}>
          <Grid className={classes.items} xs item>
            <Typography
              component="h1"
              variant="h2"
              color="inherit"
              gutterBottom
              style={{ fontWeight: 'bold' }}
            >
              {data.title}
            </Typography>
            <TextLoop>
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
              underline="always"
              variant="h6"
              href={data.link.url}
              style={{ fontWeight: 'bold' }}
            >
              {data.link.title}
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
