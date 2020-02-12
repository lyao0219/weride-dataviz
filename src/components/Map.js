import React, { memo, Component } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import _ from "lodash";

import worldMapImage from "../assets/worldMap3.jpg";

class Map extends Component {
  componentDidMount() {
    this._drawMap();
  }

  componentDidUpdate(prevProps) {
    const { itemData } = this.props;
    if (_.isEqual(itemData, prevProps.itemData)) return;

    d3.select(this.refs.weride_map).select("svg").remove();
    d3.select(this.refs.weride_map).select(".tooltip").remove();
    this._drawMap();
  }

  _drawMap = () => {
    const { itemData, onClickEvent } = this.props;

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
    };

    const div = d3.select(this.refs.weride_map).append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // making graph responsive
    const defaultWidth = 700 - margin.left - margin.right;
    const defaultHeight = 700 - margin.top - margin.bottom;
    const defaultRatio = defaultWidth / defaultHeight;
    let currentWidth;
    let currentHeight;
    let currentRatio;
    let height;
    let width;

    // Determine current size, which determines vars
    function setSize() {
      currentWidth = window.innerWidth;
      currentHeight = window.innerHeight;
      currentRatio = currentWidth / currentHeight;
      let h; let w;
      // desktop
      if (currentRatio > defaultRatio) {
        h = defaultHeight;
        w = defaultWidth;
        // mobile
      } else {
        margin.left = 40;
        w = currentWidth - 40;
        h = w / defaultRatio;
      }
      // Set new width and height based on graph dimensions
      width = w - margin.top - margin.right;
      height = h - margin.top - margin.bottom;
    }
    setSize();
    // end responsive graph code


    // format the data
    data.forEach((d) => {
      d.coordinates.x = +d.coordinates.x; // eslint-disable-line
      d.coordinates.y = +d.coordinates.y; // eslint-disable-line
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

    const svg = d3.select("#scatter").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        `translate(${margin.left},${margin.top})`);

    // add the background
    const defs = svg.append("defs");

    defs.append("pattern")
      .attr("id", "map")
      .attr("patternUnits", "userSpaceOnUse")
      .attr("width", defaultWidth)
      .attr("height", defaultHeight)
      .append("svg:image")
      .attr("xlink:href", worldMapImage)
      .attr("width", defaultWidth - margin.right * 2)
      .attr("height", defaultHeight - margin.bottom * 2)
      .attr("x", 0)
      .attr("y", 0);

    svg.append("rect")
      .attr("width", defaultWidth)
      .attr("height", defaultHeight)
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
    const tempData = data.slice(1, data.length - 1);
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
    svg.selectAll("dot")
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
      .on("mouseover", (d) => {
        d3.select(d3.event.target).transition()
          .duration("100")
          .attr("r", 7);
        div.transition()
          .duration(100)
          .style("opacity", 1);
        div.html(d.location)
          .style("left", `${d3.select(d3.event.target).attr("cx") + 10}px`)
          .style("top", `${d3.select(d3.event.target).attr("cy") - 15}px`);
      })
      .on("mouseout", () => {
        d3.select(d3.event.target).transition()
          .duration("200")
          .attr("r", 5);
        div.transition()
          .duration("200")
          .style("opacity", 0);
      })
      .on("click", (d) => {
        onClickEvent(d);
      });

    // Add the axis
    if (width < 500) {
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(5));
    } else {
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));
    }

    svg.append("g")
      .call(d3.axisLeft(y).tickFormat((d) => {
        return d;
      }));
  }

  render() {
    return (
      <div className="map" ref="weride_map">
        <div id="scatter" />
      </div>
    );
  }
}

Map.defaultProps = {
  onClickEvent: () => {},
};

Map.propTypes = {
  itemData: PropTypes.object.isRequired,
  onClickEvent: PropTypes.func,
};

export default memo(Map);
