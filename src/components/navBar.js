import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import store from "../redux/reducer";
import { changeCurrency } from "../redux/currencySlice";
import { Link } from "react-router-dom";

var config = require("../configFiles/config.js");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: "300px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  dropdown: {
    color: "black",
    marginTop: "0.2rem",
  },
  icon: {
    color: "black",
  },
  currencyText: {
    fontSize: "1.2rem",
    marginRight: "0.6rem",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to={`/`} className={classes.link}>
              {config.siteMetadata.title}
            </Link>
          </Typography>

          <span className={classes.currencyText}>Currency: </span>
          <span>
            <select
              className={classes.dropdown}
              onChange={(e) => {
                store.dispatch(changeCurrency(e.target.value));
              }}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select>
          </span>
        </Toolbar>
      </AppBar>
    </div>
  );
}
