import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Banner from '../../components/Banner';
import TextCarousel from '../../components/TextCarousel';
import CardCarousel from '../../components/CardCarousel';
import {
  hero,
  banner,
  banner2,
  testamonialCarousel,
  blogCarousel,
  nav,
} from './data.json';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  test: {
    backgroundColor: 'black',
    backgroundSize: 'cover',
    color: 'white',
  },
  main: {
    width: '100%',
    height: '100%',
    // overflowX: 'hidden',
    // overflowY: 'hidden',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container maxWidth={false} disableGutters={true} className={classes.main}>
      <Navbar data={nav} />
      <main className={classes.main}>
        <Hero data={hero} />
        <Banner data={banner} />
        <Banner data={banner2} color="white" backgroundColor="black" />
        <TextCarousel data={testamonialCarousel} />
        <CardCarousel data={blogCarousel} step={2} cardsShown={2} />
      </main>
    </Container>
  );
}
