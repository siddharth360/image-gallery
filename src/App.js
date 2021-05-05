import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  const [value, setValue] = useState("");
  const [savedQueries, setSavedQueries] = useState([]);

  const getValues = (value) => {
    setValue(value);
  };

  const getSavedQueries = (value) => {
    setSavedQueries(value);
  };

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/">
            <Header savedQueries={savedQueries} getValues={getValues} />
            <Home value={value} getSavedQueries={getSavedQueries} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
