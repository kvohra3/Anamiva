import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, IconButton } from '@material-ui/core';
import {
  AllInclusive,
  BatteryChargingFull,
  DeviceHub,
} from '@material-ui/icons';

const icons = {
  allInclusive: <AllInclusive />,
  chargingBatteryFull: <BatteryChargingFull />,
  deviceHub: <DeviceHub />,
};

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: '32px 28px 96px',
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
  icons: {
    transform: 'scale(1.8)',
    paddingBottom: '20px',
  },
  text: {
    paddingBottom: '10px',
  },
}));

export default function Banner(props) {
  const classes = useStyles();
  const { data } = props;
  return (
    <Grid container className={classes.container}>
      <div className={classes.content}>
        <Typography
          component="h3"
          variant="h3"
          gutterBottom
          style={{
            marginBottom: '75px',
            marginTop: '25px',
            fontWeight: 'bold',
          }}
        >
          {data.title}
        </Typography>
        <Grid container spacing={3}>
          {data.content.map((c) => (
            <Grid item xs style={{ marginBottom: '150px' }}>
              <div className={classes.icons}>{icons[c.icon]}</div>
              <Typography
                component="h4"
                variant="h5"
                style={{
                  fontWeight: 'bold',
                  paddingBottom: '20px',
                }}
              >
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
