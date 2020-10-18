import PropTypes from "prop-types";
import React from "react";

import Card from "./Card";

import "./CardsGrid.scss";

function CardsGrid({cards}) {

    return <div className="CardsGrid">
        {cards.map((card) => {
            return (
                <Card  {...card} key={card.id}/>
            );
        })}
    </div>;
}

CardsGrid.propTypes = {
    cards: PropTypes.array.isRequired
};

export default React.memo(CardsGrid);