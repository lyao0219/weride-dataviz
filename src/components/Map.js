import React, { memo, Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3';

import worldMapImage from '../assets/worldMap3.jpg';

class Map extends Component {
  componentDidMount() {
    const { itemData } = this.props;
    const data = [
      { coordinates: { x: 8000, y: 0 } },
      ...itemData,
      { coordinates: { x: 0, y: 8000 } },
    ];

    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    }

    const div = d3.select(this.refs.weride_map).append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    //making graph responsive
    const default_width = 700 - margin.left - margin.right;
    const default_height = 700 - margin.top - margin.bottom;
    const default_ratio = default_width / default_height;
    let current_width;
    let current_height;
    let current_ratio;
    let height;
    let width;

    // Determine current size, which determines vars
    function set_size() {
      current_width = window.innerWidth;
      current_height = window.innerHeight;
      current_ratio = current_width / current_height;
      let h,w;
      // desktop
      if (current_ratio > default_ratio) {
        h = default_height;
        w = default_width;
        // mobile
      } else {
        margin.left = 40
        w = current_width - 40;
        h = w / default_ratio;
      }
      // Set new width and height based on graph dimensions
      width = w - margin.top - margin.right;
      height = h - margin.top - margin.bottom;
    };
    set_size();
    //end responsive graph code


    // format the data
    data.forEach(function (d) {
      d.coordinates.x = +d.coordinates.x;
      d.coordinates.y = +d.coordinates.y;
    });

    // set the ranges
    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([0, height]);

    // Scale the range of the data
    x.domain(d3.extent(data, (d) => {
      return d.coordinates.x;
    }));
    y.domain([0, d3.max(data, (d) => {
      return d.coordinates.y;
    })]);

    // define the line
    const valueline = d3.line()
      .x(function (d) {
        return x(d.coordinates.x);
      })
      .y(function (d) {
        return y(d.coordinates.y); 
      });

    const svg = d3.select("#scatter").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // add the background
    const defs = svg.append("defs");

    defs.append("pattern")
      .attr("id", "map")
      .attr("patternUnits", "userSpaceOnUse")
      .attr("width", default_width)
      .attr("height", default_height)
      .append("svg:image")
      .attr("xlink:href", worldMapImage)
      .attr("width", default_width - margin.right * 2)
      .attr("height", default_height - margin.bottom * 2)
      .attr("x", 0)
      .attr("y", 0);

    svg.append("rect")
      .attr("width", default_width)
      .attr("height", default_height)
      .attr("x", 0)
      .attr("y", 0)
      .attr("fill", "url(#map)");

    // add the arrowhead definition
    defs.append("marker")
      .attr("id", "arrow")
      .attr("markerWidth", "5")
      .attr("markerHeight", "5")
      .attr("refX", "0")
      .attr("refY", "2")
      .attr("orient", "auto")
      .attr("markerUnits", "strokeWidth")
      .append("path")
      .attr("d", "M0,0 L0,4 L5,3 z")
      .attr("fill", "#f00");


    // Add the lines
    let tempData = data.slice(1, data.length - 1);
    for (let i = 0; i < tempData.length - 1; i++) {
      svg.append("line")
        .attr("class", "line")
        .attr("x1", x(tempData[i].coordinates.x))
        .attr("y1", y(tempData[i].coordinates.y))
        .attr("x2", x(tempData[i + 1].coordinates.x))
        .attr("y2", y(tempData[i + 1].coordinates.y))
        .attr("stroke-width", "3")
        .attr("stroke", "#000")
        .attr("marker-end", "url(#arrow)");
    }

    // Add the data points
    const path = svg.selectAll("dot")
      .data(data)
      .enter().append("circle")
      .attr("r", 5)
      .attr("cx", (d) => {
        return x(d.coordinates.x);
      })
      .attr("cy", (d) => {
        return y(d.coordinates.y);
      })
      .attr("stroke", "#32CD32")
      .attr("stroke-width", 1.5)
      .attr("fill", "#FFFFFF")
      .on("mouseover", (d, i) => {
        d3.select(this).transition()
          .duration('100')
          .attr("r", 7);
        div.transition()
          .duration(100)
          .style("opacity", 1);
        div.html(d.location)
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 15) + "px");
      })
      .on("mouseout", (d, i) => {
        d3.select(this).transition()
          .duration("200")
          .attr("r", 5);
        div.transition()
          .duration("200")
          .style("opacity", 0);
      });

    // Add the axis
    if (width < 500) {
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5));
    } else {
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    }

    svg.append("g")
      .call(d3.axisLeft(y).tickFormat(function (d) {
        return d;
      }));
  }

  render() {
    const { name } = this.props;
    return (
        <div className="map" ref="weride_map">
          <div id="scatter" />
        </div>
    );
  }
}

Map.defaultProps = {
  name: "",
};

Map.propTypes = {
  name: PropTypes.string,
};

export default memo(Map)
