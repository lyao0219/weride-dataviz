/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState } from "react";
import PropTypes from "prop-types";

import axe from "../svg/axe.svg";
import crossbow from "../svg/crossbow.svg";
import earring from "../svg/earring.svg";
import katana from "../svg/katana.svg";
import mace from "../svg/mace.svg";
import necklace from "../svg/necklace.svg";
import nullo from "../svg/nullo.svg";
import ring from "../svg/ring.svg";
import spear from "../svg/spear.svg";
import sword from "../svg/sword.svg";

function Topbar(props) {
  const { selection, onClickItem, activeItem } = props;

  return (
    <div>
      <h2 className="item_header">Items</h2>

      <span> filters: </span>
       <select>
         <option value="none">-</option>
         <option value="most_active">Most Active</option>
         <option value="oldest">Oldest</option>
       </select>

      <div className="container" style={styles.container}>
        <div className="row row-cols-4 row-cols-md-6">
          {selection.map((item) => {
            let cardClass = "card";
            if (item.item === activeItem.item) {
              cardClass = "card text-white bg-success";
            }
            return (
              <div className="col mb-4" key={item.item}>
                <div
                  className={cardClass}
                  style={styles.card}
                  role="button"
                  tabIndex={0}
                  onClick={() => onClickItem(item)}
                >
                  <Item item={item} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
    </div>
  );
}

Topbar.defaultProps = {
  selection: [],
  activeItem: {},
};

Topbar.propTypes = {
  selection: PropTypes.array,
  onClickItem: PropTypes.func.isRequired,
  activeItem: PropTypes.object,
};

class Item extends React.Component {
  render() {
    const { item } = this.props;

    const lowercase = item.item_name.toLowerCase();
    let source = nullo;

    if (lowercase.includes("axe")) {
      source = axe;
    }
    if (lowercase.includes("bow")) {
      source = crossbow;
    }
    if (lowercase.includes("ring")) {
      source = ring;
    }
    if (lowercase.includes("ear")) {
      source = earring;
    }
    if (lowercase.includes("katana")) {
      source = katana;
    }
    if (lowercase.includes("null")) {
      source = nullo;
    }
    if (lowercase.includes("axe")) {
      source = axe;
    }
    if (lowercase.includes("halberd")) {
      source = axe;
    }
    if (lowercase.includes("spear")) {
      source = spear;
    }
    if (lowercase.includes("sword")) {
      source = sword;
    }
    if (lowercase.includes("mace")) {
      source = mace;
    }
    if (lowercase.includes("neck")) {
      source = necklace;
    }
    if (lowercase.includes("spetum")) {
      source = spear;
    }
    if (lowercase.includes("bracelet")) {
      source = necklace;
    }


    return (
      <>
        <img
          className="card-img-top"
          src={source}
          alt="thumbnail"
          height="50"
          width="50" />
        <div
          className="card-body"
          style={styles.cardText}
        >
          {item.item_name}
        </div>
      </>
    );
  }
}

Item.defaultProps = {
  item: {},
};

Item.propTypes = {
  item: PropTypes.object,
};

const styles = {
  container: {
    maxHeight: 200,
    overflowY: "scroll",
    marginTop: 20,
  },
  card: {
    paddingTop: 10,
  },
  cardText: {
    textAlign: "center"
  },
};

export default Topbar;
