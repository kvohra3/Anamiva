import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Paper } from "@material-ui/core";
import { Star, StarBorder } from "@material-ui/icons";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    textAlign: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: "32px 28px 96px",
  },
  header: {
    display: "flex",
    width: "50%",
    marginRight: "auto",
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    padding: theme.spacing(4),
  },
  carouselGrid: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
  },
  quote: {
    fontFamily: "Sentinel-Medium",
    color: "#B88E5C",
    fontSize: "74px",
  },
  buttons: {
    // display: "none",
  },
}));

export default function TextCarousel(props) {
  const { data } = props;
  const classes = useStyles();

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
    return (
      <Container>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
        >
          <Grid item xs>
            <Paper
              elevation={0}
              style={{
                height: "15vh",
                width: "auto",
              }}
            >
              <Typography
                component="h5"
                variant="h5"
                style={{
                  fontSize: "initial",
                }}
              >
                {person.testimonial}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Typography
              component="h5"
              variant="h5"
              style={{
                fontSize: "initial",
              }}
            >
              - {person.name}
            </Typography>
            {person.rating}
          </Grid>
        </Grid>
      </Container>
    );
  });

  return (
    <div className={classes.root}>
      <Grid container direction="column" className={classes.container}>
        <Grid item xs>
          <Typography
            component="h3"
            variant="h3"
            className={classes.header}
            style={{ fontWeight: "bold" }}
          >
            {data.header}
          </Typography>
        </Grid>

        <Grid item xs className={classes.carouselGrid} justify="center">
          <CarouselProvider
            isIntrinsicHeight={true}
            totalSlides={carouselData.length}
            interval={3000}
            infinite={true}
            isPlaying={false}
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{
                display: "inline-flex",
              }}
            >
              <Grid item xs>
                <Typography
                  component="p"
                  variant="h1"
                  className={classes.quote}
                  style={{
                    textAlign: "right",
                  }}
                >
                  "
                </Typography>
              </Grid>
              <Grid item xs>
                <Slider>
                  {carouselData.map((cd, index) => (
                    <Slide index={index}>{cd}</Slide>
                  ))}
                </Slider>
              </Grid>
              <Grid item xs>
                <Typography
                  component="p"
                  variant="h1"
                  className={classes.quote}
                  style={{
                    textAlign: "left",
                  }}
                >
                  "
                </Typography>
              </Grid>
            </Grid>
            <ButtonBack className={classes.buttons}>Back</ButtonBack>
            <ButtonNext className={classes.buttons}>Next</ButtonNext>
          </CarouselProvider>
        </Grid>
      </Grid>
    </div>
  );
}

TextCarousel.prototype = {
  data: PropTypes.object,
};
