import React from 'react';
import logo from '../logo.svg';
import './Home.css';
import { Container } from '@material-ui/core';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { hero, threeUp, nav } from '../data.json';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <Container maxWidth={false} disableGutters={true}>
      <Navbar data={nav} />
      <main>
        <Hero data={hero} />
        <Banner data={threeUp} />
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </main>
    </Container>
  );
}
