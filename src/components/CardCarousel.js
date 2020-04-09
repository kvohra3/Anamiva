import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Slide,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from '@material-ui/core';

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
  cardRoot: {
    maxWidth: 345,
    backgroundColor: 'black',
  },
  media: {
    height: 140,
  },
}));
export default function CardCarousel(props) {
  const { data } = props;
  const classes = useStyles();
  const TIMEOUT = 3000;
  const SLIDETIME = 1000;

  const carouselData = data.content;

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

  const blogCards = data.content.map((card) => (
    <Card className={classes.cardRoot}>
      <CardActionArea href={card.url}>
        <CardMedia
          className={classes.media}
          image={card.img}
          title={card.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ color: 'white' }}
          >
            {card.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ color: 'white' }}
          >
            {card.date}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary" href={card.url}>
          Read More
        </Button>
      </CardActions>
    </Card>
  ));

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
            {blogCards[activeStep]}
          </Slide>
          <div className={classes.quote}>"</div>
        </Grid>
      </Grid>
    </div>
  );
}

CardCarousel.prototype = {
  data: PropTypes.object,
};
