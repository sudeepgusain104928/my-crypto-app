import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  error: {
    fontSize: "3rem",
    textAlign: "center",
    margin: "4rem auto",
    color: "red",
  },
}));

function ErrorComponent({ reducerData }) {
  const classes = useStyles();

  return (
    <div>
      {!!reducerData.cryptoList.error && (
        <div className={classes.error}>{reducerData.cryptoList.error}</div>
      )}
    </div>
  );
}

export default ErrorComponent;
