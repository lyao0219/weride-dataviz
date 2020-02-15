import React from "react";
import PropTypes from "prop-types";

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventNumber: 0,
    };
  }

  _onChangeEvent = (step) => {
    const { eventNumber } = this.state;
    this.setState({ eventNumber: eventNumber + step });
  }

  render() {
    const { selection } = this.props;
    const { eventNumber } = this.state;

    if (!selection || !selection[0]) {
      return (
        <div className="info">
          <h2>Click on a location</h2>
        </div>
      );
    }

    return (
      <div className="info">

        <div className = "info_div_1">
        <h3>{selection[eventNumber].item_name}</h3>
        <h4>
          Event
          {" "}
          {eventNumber + 1}
          {" "}
          of
          {" "}
          {selection.length}
        </h4>
        </div>

        
        <div className = "info_div_2">
        <h5>Location</h5>
        <ul>
          <li>{selection[eventNumber].location}</li>
        </ul>
        <h5>{selection[eventNumber].type}</h5>
        <ul>
          <li>
            From
            {" "}
            <p1>{selection[eventNumber].primary_name}</p1>
            {" "}
            to
            {" "}
            <p2>{selection[eventNumber].secondary_name}</p2>
          </li>
        </ul>
        <h5>Special description</h5>
        <ul>
          <li>{selection[eventNumber].special}</li>
        </ul>
        </div>
      </div>
    );
  }
}

Info.defaultProps = {
  selection: [],
};

Info.propTypes = {
  selection: PropTypes.array,
};

export default Info;
