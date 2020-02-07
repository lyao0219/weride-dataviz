import React from "react";

function Topbar(){
    return(
        <div className="items">
        <span>Items</span> <span>filters:</span>
        <select>
            <option value="none">-</option>
            <option value="most_active">Most Active</option>
            <option value="oldest">Oldest</option>
        </select>

        <div className="thumbnail-container">
            <ul className="thumbnail-list">
                <li><span><img className="thumbnail-image" src="http://placehold.it/300x300"/></span></li>
            </ul>
        </div>
    </div>
    );
}

export default Topbar;
