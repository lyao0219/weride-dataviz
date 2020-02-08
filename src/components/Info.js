import React from "react";

class Info extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="info">
                <h2>{this.props.selection[0].item_name}</h2>
                <h3>Event {this.props.eventNumber} of {this.props.totalEvents}</h3>
                <h3>Location</h3>
                <ul>
                    <li>{this.props.selection[0].location}</li>
                </ul>
                <h3>Owner Change</h3>
                <ul>
                    <li>From {this.props.selection[0].primary_name} to {this.props.selection[0].secondary_name}</li>
                </ul>
                <h3>Special description</h3>
                <ul>
                    <li>{this.props.selection[0].special}</li>
                </ul>
            </div>
        );
    }
};

export default Info;
