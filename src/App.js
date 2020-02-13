import React, { useState } from "react";
import _ from "lodash";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import Map from "./components/Map";
import Topbar from "./components/Topbar";
import Info from "./components/Info";
import Legend from "./components/Legend";
import Description from "./components/Description";

import werideData from "./data/dataviz.json";

function extractItems(data) {
  const newArray = [];
  data.map((item) => {
    const foundItem = _.find(newArray, ["item", item.item]);
    if (foundItem) {
      return item;
    }

    newArray.push(item);
    return item;
  });

  return newArray;
}

function App() {
  const [activeLocation, setActiveLocation] = useState([]);
  const [activeItem, setActiveItem] = useState([]);

  const onClickEvent = (event) => {
    const locationEvents = _.filter(werideData, {
      "item": event.item,
      "location": event.location,
    });
    setActiveLocation(locationEvents);
  };

  const onClickItem = (item) => {
    const result = _.filter(werideData, ["item", item.item]);
    setActiveItem(_.sortBy(result, (o) => moment(o.date)));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <Description />
        </div>
        <div className="row">
          <Topbar
            selection={extractItems(werideData)}
            onClickItem={onClickItem}
            activeItem={activeItem[0]}
          />
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12">
            <Map itemData={activeItem} onClickEvent={onClickEvent} />
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-body">
                <Info selection={activeLocation} />
              </div>
            </div>
            <div className="card" style={styles.topBuffer}>
              <div className="card-body">
                <Legend />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  topBuffer: {
    marginTop: 25,
  },
};

export default App;
