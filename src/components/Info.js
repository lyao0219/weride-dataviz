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
        <h2>{selection[eventNumber].item_name}</h2>
        <h4>
          Event
          {eventNumber + 1}
          {" "}
          of
          {selection.length + 1}
        </h4>
        <h3>Location</h3>
        <ul>
          <li>{selection[eventNumber].location}</li>
        </ul>
        <h3>Owner Change</h3>
        <ul>
          <li>
            From
            {selection[eventNumber].primary_name}
            {" "}
            to
            {selection[eventNumber].secondary_name}
          </li>
        </ul>
        <h3>Special description</h3>
        <ul>
          <li>{selection[eventNumber].special}</li>
        </ul>
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
