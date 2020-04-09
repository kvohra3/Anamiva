import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Slide, Typography, Paper } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    textAlign: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: '32px 28px 96px',
  },
  header: {
    display: 'flex',
    width: '50%',
    marginRight: 'auto',
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    padding: theme.spacing(4),
  },
  carouselContainer: {
    width: '50%',
    height: '50%',
    marginLeft: '0px',
    marginRight: '0px',
  },
  carousel: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  quote: {
    fontFamily: 'Sentinel-Medium',
    color: '#B88E5C',
    fontSize: '74px',
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
}));

export default function TextCarousel(props) {
  const { data } = props;
  const classes = useStyles();
  const TIMEOUT = 3000;
  const SLIDETIME = 1000;

  const stars = [
    <StarBorder />,
    <StarBorder />,
    <StarBorder />,
    <StarBorder />,
    <StarBorder />,
  ];

  const carouselData = data.content.map((person) => {
    const rating = stars.map((s, i) => {
      if (i < person.stars) return <Star />;
      return s;
    });
    person.rating = rating;
    return person;
  });

  const [activeStep, setActiveStep] = useState(0);
  const [elementIn, setElementIn] = useState(true);
  const [direction, setDirection] = useState('left');

  useEffect(() => {
    const id = setTimeout(() => {
      setDirection('right');
      setElementIn(false);
    }, TIMEOUT);
    return () => clearTimeout(id);
  }, [activeStep]);

  const handleEnd = (node, done) => {
    node.addEventListener('transitionstart', showNext, false);
  };

  const showNext = () => {
    if (!elementIn) {
      const next = (activeStep + 1) % carouselData.length;
      setTimeout(() => {
        setActiveStep(next);
        setDirection('left');
        setElementIn(true);
      }, SLIDETIME);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" className={classes.container}>
        <Grid item xs>
          <Typography
            component="h3"
            variant="h3"
            className={classes.header}
            style={{ fontWeight: 'bold' }}
          >
            {data.header}
          </Typography>
        </Grid>

        <Grid item xs className={classes.carousel} justify="center">
          <div className={classes.quote}>"</div>
          <Slide
            direction={direction}
            in={elementIn}
            addEndListener={handleEnd}
            timeout={{ enter: SLIDETIME, exit: SLIDETIME }}
          >
            <Container className={classes.carouselContainer}>
              <Paper
                elevation={0}
                style={{
                  height: '15vh',
                  width: 'auto',
                  backgroundColor: 'rgb(184,176,158)',
                }}
              >
                <Typography
                  component="h5"
                  variant="h5"
                  style={{
                    fontSize: 'large',
                  }}
                >
                  {carouselData[activeStep].testimonial}
                </Typography>
              </Paper>
              <Typography
                component="h5"
                variant="h5"
                style={{
                  fontSize: 'large',
                }}
              >
                - {carouselData[activeStep].name}
              </Typography>
              {carouselData[activeStep].rating}
            </Container>
          </Slide>
          <div className={classes.quote}>"</div>
        </Grid>
      </Grid>
    </div>
  );
}

TextCarousel.prototype = {
  data: PropTypes.object,
};
