import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container } from "@material-ui/core";
import MainFeature from "../components/MainFeature";
// import Navbar from "./Navbar";

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
  linkText: "Continue reading…",
};

function App() {
  return (
    <Container maxWidth={false} disableGutters={true}>
      <main>
        <MainFeature post={mainFeaturedPost} />
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

export default App;
