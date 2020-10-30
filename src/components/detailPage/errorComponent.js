import React from "react";
import "./detailPage.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  error: {
    fontSize: "3rem",
    textAlign: "center",
    margin: "4rem auto",
    color: "red",
  },
}));

function ErrorComponent({ cryptoHistory, cryptoInfo }) {
  const classes = useStyles();

  return (
    <div>
      {cryptoInfo.error && (
        <div className={classes.error}>{cryptoInfo.error}</div>
      )}
      {cryptoHistory.error && (
        <div className={classes.error}> {cryptoHistory.error} </div>
      )}
    </div>
  );
}

export default ErrorComponent;
