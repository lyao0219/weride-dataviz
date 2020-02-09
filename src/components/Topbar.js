import React from "react";

import axe from '../svg/axe.svg'
import crossbow from '../svg/crossbow.svg'
import earring from '../svg/earring.svg'
import katana from '../svg/katana.svg'
import mace from '../svg/mace.svg'
import necklace from '../svg/necklace.svg'
import nullo from '../svg/nullo.svg'
import ring from '../svg/ring.svg'
import spear from '../svg/spear.svg'
import sword from '../svg/sword.svg'

class Topbar extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="items">
                <h2 className="item_header">Items</h2> <span>filters: </span>
                <select>
                    <option value="none">-</option>
                    <option value="most_active">Most Active</option>
                    <option value="oldest">Oldest</option>
                </select>

                <div className="thumbnail-container">
                    <ul className="thumbnail-list">
                        {this.props.selection.map(function(item, index){
                            return <Item key={ index } item={item}/>;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

class Item extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        let lowercase = this.props.item.item_name.toLowerCase();
        let source = nullo;

        if(lowercase.includes('axe')){
            source = axe;
        }
        if(lowercase.includes('bow')){
            source = crossbow;
        }
        if(lowercase.includes('ring')){
            source = ring;
        }
        if(lowercase.includes('ear')){
            source = earring;
        }
        if(lowercase.includes('katana')){
            source = katana;
        }
        if(lowercase.includes('null')){
            source = nullo;
        }
        if(lowercase.includes('axe')){
            source = axe;
        }
        if(lowercase.includes('halberd')){
            source = axe;
        }
        if(lowercase.includes('spear')){
            source = spear;
        }
        if(lowercase.includes('sword')){
            source = sword;
        }
        if(lowercase.includes('mace')){
            source = mace;
        }
        if(lowercase.includes('neck')){
            source = necklace;
        }
        if(lowercase.includes('spetum')){
            source = spear;
        }
        if(lowercase.includes('bracelet')){
            source = necklace;
        }


        return(
            <li>
                <span>
                    <img className="thumbnail-image" src={source} height="80"
                           width="80"/>
                    <div className="item-name">{this.props.item.item_name}</div>
                </span>
            </li>
        );
    }
}

export default Topbar;
