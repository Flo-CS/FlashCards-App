import "./Modal.scss"
import React from "react";
import ReactDOM from "react-dom"

import {Transition} from "react-transition-group";


const defaultModalStyle = {
    transition: `transform 300ms ease, opacity 300ms ease`,
    opacity: 1
};
const modalTransitionStyles = {
    entering: {opacity: 0, transform: "translate(-50%, -50%) scale(0.8)"},
    entered: {opacity: 1, transform: "translate(-50%, -50%) scale(1)"},
    exiting: {opacity: 0, transform: "translate(-50%, -50%) scale(0.8)"},
    exited: {opacity: 0, transform: "translate(-50%, -50%) scale(0.8)"}
};

export default function Modal({children, isModalShown, onModalClose}) {

    if (!isModalShown) return null

    // We use mouse down to not fire the event when the user hold the click and move mouse
    function handleModalClose() {
        onModalClose()
    }

    return ReactDOM.createPortal(
        <Transition in={isModalShown} timeout={0} appear>
            {(state) => (
                <div className="modal">
                    <div className="modal__overlay" onMouseDown={handleModalClose}
                    >
                    </div>
                    <div className="modal__wrapper"
                         style={{ ...defaultModalStyle, ...modalTransitionStyles[state]}}>
                        <div className="modal__inner">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </Transition>
        , document.querySelector("body"))
}
