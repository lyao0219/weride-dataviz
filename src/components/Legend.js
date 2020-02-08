import React from "react";

function Legend(){
    return(
        <div className="legend">
            <h3>Legend</h3>
            <ul className="legendList">
                <li className="bosskill">Boss kill</li>
                <li className="ownerchange">Owner Change</li>
                <li className="playerkill">Player kill</li>
            </ul>
        </div>
    );
}

export default Legend;
