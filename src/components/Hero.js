import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainFeatured: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    // textAlign: 'center',
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
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
}));

export default function Hero(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <Paper
      className={classes.mainFeatured}
      style={{ backgroundImage: `url(${data.image})` }}
    >
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: 'none' }}
          src={data.image}
          alt={data.imageText}
        />
      }
      <div className={classes.overlay} />
      <Grid container justify="center">
        <div className={classes.mainFeaturedContent}>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            {data.title}
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            {data.description}
          </Typography>
          <Link variant="subtitle1" href="#">
            {data.linkText}
          </Link>
        </div>
      </Grid>
    </Paper>
  );
}

Hero.propTypes = {
  data: PropTypes.object,
};
