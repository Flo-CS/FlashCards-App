import {CSSTransition, SwitchTransition} from "react-transition-group";
import React from "react";

import "./CardFlipAnimation.scss"

function CardFlipAnimation({children, isBackShown}) {
    return <SwitchTransition mode={"out-in"}>
        <CSSTransition key={isBackShown}
                       addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                       classNames="animation__flip">
            {children}
        </CSSTransition>
    </SwitchTransition>
}


export default CardFlipAnimation