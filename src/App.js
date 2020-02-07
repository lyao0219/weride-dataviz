import React from 'react';
/* The following line can be included in your src/index.js or App.js file*/
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Map from './components/Map';
import Topbar from './components/Topbar';
import Info from './components/Info';
import Legend from './components/Legend';

function App() {
    return (
        <div className="App">
            <Topbar />
            <Map name="awesome map" />
            <Info />
            <Legend />
        </div>
    );
}

export default App;
