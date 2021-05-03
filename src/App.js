import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
// import Home from "./components/Home";
import Results from "./components/Results";

function App() {
  const [value, setValue] = useState("");

  const getValues = (value) => {
    setValue(value);
    console.log("value", value);
  };

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/">
            {/* <Home /> */}
            {/* <Header /> */}
            <Header getValues={getValues} />
            <Results value={value} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
