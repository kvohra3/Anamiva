import React from 'react';
import { Container } from '@material-ui/core';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import TextCarousel from '../components/TextCarousel';
import { hero, banner, banner2, testamonialCarousel, nav } from '../data.json';
import Navbar from '../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  test: {
    backgroundColor: 'black',
    backgroundSize: 'cover',
    color: 'white',
  },
  main: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    backgroundColor: 'rgb(184,176,158)',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container maxWidth={false} disableGutters={true} className={classes.main}>
      <Navbar data={nav} />
      <main>
        <Hero data={hero} />
        <Banner data={banner} />
        <Banner data={banner2} color="white" backgroundColor="black" />
        <TextCarousel data={testamonialCarousel} />
        <div className={classes.test}>
          <h1>NEXT</h1>
        </div>
      </main>
    </Container>
  );
}
