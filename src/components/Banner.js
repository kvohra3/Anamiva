import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import {
  AllInclusive,
  BatteryChargingFull,
  DeviceHub,
  Dashboard,
} from '@material-ui/icons';

const icons = {
  allInclusive: <AllInclusive />,
  chargingBatteryFull: <BatteryChargingFull />,
  deviceHub: <DeviceHub />,
  dashboard: <Dashboard />,
};

export default function Banner(props) {
  const { data, backgroundColor, color } = props;
  const useStyles = makeStyles((theme) => ({
    container: {
      textAlign: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      padding: '0px 28px 96px',
      color: color ? color : 'black',
      backgroundColor: backgroundColor ? backgroundColor : 'rgb(184,176,158)',
    },
    content: {
      width: '100%',
      position: 'relative',
      padding: theme.spacing(3),
      paddingTop: '0px',
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
    },
    icons: {
      transform: 'scale(1.8)',
      paddingBottom: '20px',
    },
    titles: {
      marginBottom: '125px',
      marginTop: '75px',
      width: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <div className={classes.content}>
        <div className={classes.titles}>
          <Typography
            component="h3"
            variant="h3"
            gutterBottom
            style={{
              fontWeight: 'bold',
              paddingBottom: '20px',
            }}
          >
            {data.title}
          </Typography>
          <Typography component="h4" variant="h6">
            {data.subTitle}
          </Typography>
        </div>
        <Grid container spacing={3}>
          {data.content.map((c) => (
            <Grid item xs>
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
