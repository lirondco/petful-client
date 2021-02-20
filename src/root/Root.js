import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "../Routes/LandingPage";
import AdoptionPage from "../Routes/AdoptionPage";
import Logo from "../Image/FIFO.png"
import './Root.css'

export default class Root extends React.Component {
  render() {
    return (
      <main>
        <header><img alt='FIFO by petful logo' src={Logo}/></header>
        <div>
          <Router>
            <Switch>
              <Route exact path={"/"} component={LandingPage} />
              <Route path={"/adoption"} component={AdoptionPage} />
            </Switch>
          </Router>
        </div>
      </main>
    );
  }
}