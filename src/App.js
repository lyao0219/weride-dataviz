import React, { useState } from "react";
import _ from "lodash";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import Map from "./components/Map";
import Topbar from "./components/Topbar";
import Info from "./components/Info";
import Legend from "./components/Legend";

import werideData from "./data/dataviz.json";

function getRandomSubarray(arr, size) {
  const shuffled = arr.slice(0); let i = arr.length; let temp; let
    index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

function getItemEvents(item) {
  const result = _.filter(werideData, ["item", item]);
  return _.sortBy(result, (o) => moment(o.date));
}

function App() {
  const [activeLocation, setActiveLocation] = useState({});
  const onClickEvent = (event) => {
    const locationEvents = _.filter(werideData, {
      "item_name": event.item_name,
      "location": event.location,
    });
    setActiveLocation(locationEvents);
  };

  return (
    <div className="App">
      <Topbar selection={getRandomSubarray(werideData, 12)} />
      <Map name="awesome map" itemData={getItemEvents(3)} onClickEvent={onClickEvent} />
      <Info selection={activeLocation} />
      <Legend />
    </div>
  );
}

export default App;
