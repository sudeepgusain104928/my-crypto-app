import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainGrid from "../components/mainGrid/mainGrid";
import Navbar from "../components/navBar";
import DetailPage from "../components/detailPage/detailPage";
import Container from "@material-ui/core/Container";

function RouteConfig() {
  return (
    <div>
      <Router>
        <Navbar />
        <Container maxWidth="xl">
          <Switch>
            <Route exact path="/" component={MainGrid} />
            <Route path="/:id" component={DetailPage} />
            <Route path="*" component={() => <h2>404 Not Found</h2>} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default RouteConfig;
