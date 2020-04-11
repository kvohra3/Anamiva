import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { nav } from "./data.json";
import Navbar from "../../components/Navbar";

const useStyles = makeStyles((theme) => ({
  test: {
    backgroundColor: "black",
    backgroundSize: "cover",
    color: "white",
  },
  main: {
    overflowX: "hidden",
    overflowY: "hidden",
    backgroundColor: "rgb(184,176,158)",
  },
}));

export default function Shop() {
  const classes = useStyles();
  return (
    <Container maxWidth={false} disableGutters={true} className={classes.main}>
      <Navbar data={nav} />
      <main className={classes.main}></main>
    </Container>
  );
}
