import React from 'react';
/* The following line can be included in your src/index.js or App.js file*/
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Map from './components/Map';
import Topbar from './components/Topbar';
import Info from './components/Info';
import Legend from './components/Legend';

import werideData from './data/dataviz.json';

function getRandomSubarray(arr, size) {
    let shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

function App() {
    return (
        <div className="App">
            <Topbar selection={getRandomSubarray(werideData, 12)}/>
            <Map name="awesome map" />
            <Info selection={getRandomSubarray(werideData, 1)} eventNumber={2} totalEvents={3} />
            <Legend />
        </div>
    );
}

export default App;
