import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useSelector } from "react-redux";
import { fetchCryptoList } from "../../redux/cryptoListSlice";
import store from "../../redux/reducer";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorComponent from "./errorComponent";
import { MoneyFormat } from "../../utils/valueApprox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2rem",
  },
  innerGrid: {
    textAlign: "center",
  },
  paper: {
    margin: "0 auto",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    borderStyle: "solid",
    borderWidth: "0.1rem",
    boxShadow: "10px 10px 10px grey",
    backgroundColor: "#f5f3f3",
  },
  dataName: {
    fontSize: "1.5rem",
    margin: "1rem",
    marginTop: "0rem",
    textShadow: "4px 2px 9px grey",
    fontWeight: "bold",
  },
  dataImg: {
    marginTop: "1rem",
    maxWidth: "100%",
    maxHeight: "10rem",
    minWidth: "100%",
    minHeight: "10rem",
    padding: "1rem",
  },
  pagination: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    margin: "2rem",
    display: "flex",
    justifyContent: "center",
    maxWidth: "100%",
  },
  innerPaper: {
    backgroundColor: "#fbfbfb",
    borderBottomStyle: "solid",
  },
  innerPaperHeadings: {
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
  innerPaperValueMarket: {
    fontSize: "1rem",
  },
  innerPaperValueChangePos: {
    color: "green",
    fontSize: "1rem",
  },
  innerPaperValueChangeNeg: {
    color: "red",
    fontSize: "1rem",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  loader: {
    margin: "2rem auto",
    textAlign: "center",
  },
  error: {
    fontSize: "3rem",
    textAlign: "center",
    margin: "4rem auto",
    color: "red",
  },
}));

function MainGrid() {
  const classes = useStyles();

  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);

  const reducerData = useSelector(({ currency, cryptoList }) => ({
    currency,
    cryptoList,
  }));

  useEffect(() => {
    const values = { base: reducerData.currency, offset: offset };
    store.dispatch(fetchCryptoList(values));
  }, [reducerData.currency, offset]);

  const handleChangePagination = (event, value) => {
    setOffset((value - 1) * 10);
    setPage(value);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <div>
          {reducerData.cryptoList.data && (
            <div className={classes.pagination}>
              <Pagination
                page={page}
                onChange={handleChangePagination}
                count={Math.ceil(reducerData.cryptoList.data.stats.total / 9)}
                color="primary"
              />
            </div>
          )}

          {reducerData.cryptoList.isLoading && (
            <div className={classes.loader}>
              <CircularProgress />
            </div>
          )}

          <ErrorComponent reducerData={reducerData} />

          {reducerData.cryptoList.data && (
            <Grid container spacing={5}>
              {reducerData.cryptoList.data.coins.map((data, ind) => (
                <Grid
                  key={ind}
                  className={classes.innerGrid}
                  item
                  xl={4}
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                >
                  <Paper className={classes.paper}>
                    <h2 className={classes.dataName}>
                      {" "}
                      <Link
                        to={{
                          pathname: `/${data.slug}`,
                          state: { id: data.id },
                        }}
                        className={classes.link}
                      >
                        {data.name}{" "}
                      </Link>
                    </h2>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Paper className={classes.innerPaper}>
                          <span className={classes.innerPaperHeadings}>
                            Market Cap ({reducerData.currency}):
                          </span>{" "}
                          <span className={classes.innerPaperValueMarket}>
                            {MoneyFormat(data.marketCap)}
                          </span>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Paper className={classes.innerPaper}>
                          <span className={classes.innerPaperHeadings}>
                            Change (24h):
                          </span>{" "}
                          <span
                            className={
                              data.change > 0
                                ? classes.innerPaperValueChangePos
                                : classes.innerPaperValueChangeNeg
                            }
                          >
                            {data.change}
                          </span>
                        </Paper>
                      </Grid>
                    </Grid>

                    <img
                      className={classes.dataImg}
                      src={data.iconUrl}
                      alt="icon"
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {reducerData.cryptoList.data && (
            <div className={classes.pagination}>
              <Pagination
                page={page}
                onChange={handleChangePagination}
                count={Math.ceil(reducerData.cryptoList.data.stats.total / 9)}
                color="primary"
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default MainGrid;
