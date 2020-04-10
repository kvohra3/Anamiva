import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from '@material-ui/core';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'black',
    color: 'white',
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
  carouselGrid: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardRoot: {
    backgroundColor: 'black',
    margin: '3%',
  },
  gridItem: {
    color: 'white',
    width: '100%',
  },
  slider: {
    display: 'inline-flex',
  },
  buttons: {
    borderRadius: '0px',
    height: '50%',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: 'white',
    border: 'none',
    background: 'none',
    '&:hover': {
      opacity: 0.75,
    },
  },
  button: {
    textTransform: 'none',
    borderColor: 'white',
    color: 'white',
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
    },
  },
  nonScrollableBlog: {
    width: '100%',
    display: 'inline-flex',
  },
  displayNone: {
    display: 'none',
  },
  links: {
    display: 'block',
  },
  media: {
    height: '20vw',
  },
  mediaNonScrollable: {
    height: '20vw',
    width: '45vw',
  },
}));
export default function CardCarousel(props) {
  const { data, step, cardsShown } = props;

  const classes = useStyles();

  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    setTimeout(() => setAutoPlay(true), 5000);
  });

  const blogCards = data.content.map((card) => (
    <Card className={classes.cardRoot}>
      <CardActionArea href={card.url}>
        <CardMedia
          className={
            data.content.length > 2 ? classes.media : classes.mediaNonScrollable
          }
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
      <CardActions className={classes.links}>
        <Button variant="outlined" className={classes.button}>
          Share
        </Button>
        <Button variant="outlined" href={card.url} className={classes.button}>
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
        <Grid item xs className={classes.carouselGrid} justify="stretch">
          {blogCards.length > 2 ? (
            <CarouselProvider
              isIntrinsicHeight={true}
              totalSlides={blogCards.length}
              interval={5000}
              step={step}
              visibleSlides={cardsShown}
              isPlaying={autoPlay}
              infinite={true}
            >
              <div className={classes.slider}>
                <ButtonBack className={classes.buttons}>
                  <KeyboardArrowLeft />
                </ButtonBack>
                <Slider>
                  {blogCards.map((bc, index) => (
                    <Slide index={index}>{bc}</Slide>
                  ))}
                </Slider>

                <ButtonNext className={classes.buttons}>
                  <KeyboardArrowRight />
                </ButtonNext>
              </div>
            </CarouselProvider>
          ) : (
            <div className={classes.nonScrollableBlog}>{blogCards}</div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

CardCarousel.prototype = {
  data: PropTypes.object,
};
