import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default function Banner(props) {
  const classes = useStyles();
  const { data } = props;
  return (
    <Grid container className={classes.container}>
      <div className={classes.content}>
        <Typography component="h3" variant="h3" gutterBottom>
          {data.title}
        </Typography>
        <Grid container spacing={3}>
          {data.content.map((c) => (
            <Grid item xs>
              <Typography component="h4" variant="h5">
                {c.title}
              </Typography>
              <Typography component="p" variant="body1">
                {c.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </div>
    </Grid>
  );
}

Banner.propTypes = {
  data: PropTypes.object,
};
