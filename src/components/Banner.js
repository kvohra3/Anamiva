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
      color: color ? color : 'black',
      backgroundColor: backgroundColor ? backgroundColor : 'white',
    },
    content: {
      width: '100%',
      position: 'relative',
      paddingBottom: '120px',
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
    // border: {
    //   'border-left': '2px solid #f51c40',
    //   position: 'absolute',
    //   top: '10px',
    //   bottom: '10px',
    //   left: '0px',
    // },
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
          {data.content.map((c, i) => (
            <Grid
              item
              xs
              style={
                i === data.content.length - 1
                  ? {}
                  : {
                      borderRight: '2px solid',
                      top: '10px',
                      bottom: '10px',
                      left: '0px',
                    }
              }
            >
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
              {/* <div className={classes.border}></div> */}
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
