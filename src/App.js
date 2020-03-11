import React from "react";
import BatteryData from "./components/BatteryData.js";
import InverterData from "./components/InverterData.js";
import PVData from "./components/PVData";
import Navigation from "./components/Navigation";

import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import Tables from "./components/Tables.js";

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0000ff08" }}>
      <div className="w-full bg-blue-600 h-1"></div>
      <Router>
        <Navigation />
        <Switch>
          <section className="flex flex-wrap px-2 md:px-20 m-3">
            <Route exact path="/">
              <Redirect to={{ pathname: "/chart" }} />
            </Route>
            <Route path="/chart">
              <BatteryData /> <InverterData /> <PVData />
            </Route>
            <Route path="/table">
              <Tables />
            </Route>
          </section>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
