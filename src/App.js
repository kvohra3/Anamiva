import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from '@material-ui/core';
import Hero from './components/Hero';
import Banner from './components/Banner';
import { hero, threeUp, nav } from './data.json';
import Navbar from './components/Navbar';
import { StickyContainer, Sticky } from 'react-sticky';

function App() {
  return (
    <StickyContainer>
      <Container maxWidth={false} disableGutters={true}>
        <Sticky>{({ style }) => <Navbar style={style} data={nav} />}</Sticky>
        {/* <Sticky>
          
        </Sticky> */}
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
    </StickyContainer>
  );
}

export default App;
