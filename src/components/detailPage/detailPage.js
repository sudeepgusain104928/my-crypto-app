import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { fetchCryptoHistory } from "../../redux/detailPageHistorySlice";
import store from "../../redux/reducer";
import { useSelector } from "react-redux";
import { fetchCryptoInfo } from "../../redux/detailPageInfoSlice";
import { Markup } from "interweave";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./detailPage.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import TimeSeriesGraph from "./timeSeriesGraph";
import ErrorComponent from "./errorComponent";
import { MoneyFormat } from "../../utils/valueApprox";

const useStyles = makeStyles((theme) => ({
  loader: {
    margin: "2rem auto",
    textAlign: "center",
  },
}));

function DetailPage(props) {
  const classes = useStyles();

  const [period, setPeriod] = useState("24h");

  const timeFrame = period;

  const id = props.location.state.id;

  const { cryptoHistory, cryptoInfo, currency } = useSelector(
    ({ cryptoHistory, cryptoInfo, currency }) => ({
      cryptoHistory,
      cryptoInfo,
      currency,
    })
  );

  let des = "";

  if (cryptoInfo.data) {
    des = cryptoInfo.data.coin.description;
  }

  useEffect(() => {
    const values = { id: id, timeFrame: timeFrame, base: currency };
    store.dispatch(fetchCryptoHistory(values));
    store.dispatch(fetchCryptoInfo(values));
  }, [period, currency, id, timeFrame]);

  return (
    <div>
      <ErrorComponent cryptoHistory={cryptoHistory} cryptoInfo={cryptoInfo} />

      {cryptoHistory.isLoading && cryptoInfo.isLoading && (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}
      {!!cryptoHistory.data &&
      !!cryptoInfo.data &&
      cryptoInfo.data.coin.id === id ? (
        <Container maxWidth="lg">
          <div className="headingContainer">
            <h1>{cryptoInfo.data.coin.name} </h1>
            <img src={cryptoInfo.data.coin.iconUrl} alt="icon" />
          </div>

          <Grid className="grid" container spacing={3} justify="space-between">
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Paper className="paper">
                <span className="paperHeadings">Volume:</span>{" "}
                <span className="paperValues">
                  {MoneyFormat(cryptoInfo.data.coin.volume)}
                </span>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Paper className="paper">
                <span className="paperHeadings">Market Cap ({currency}):</span>{" "}
                <span className="paperValues">
                  {MoneyFormat(cryptoInfo.data.coin.marketCap)}
                </span>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Paper className="paper">
                <span className="paperHeadings">Total Supply:</span>{" "}
                <span className="paperValues">
                  {MoneyFormat(cryptoInfo.data.coin.totalSupply)}
                </span>
              </Paper>
            </Grid>
          </Grid>

          <div className="description">
            <Markup content={des} />
          </div>
          <h3 className="priceTrendHeading">Price Trend History</h3>
          <div className="dropdownContainer">
            <select
              className="dropdown"
              onChange={(e) => {
                setPeriod(e.target.value);
              }}
            >
              <option value="24h">24 hours</option>
              <option value="7d">7 days</option>
              <option value="30d">30 days</option>
              <option value="1y">1 year</option>
              <option value="5y">5 years</option>
            </select>
          </div>
          <TimeSeriesGraph
            cryptoHistory={cryptoHistory}
            cryptoInfo={cryptoInfo}
            currency={currency}
          />
        </Container>
      ) : null}
    </div>
  );
}

export default DetailPage;
