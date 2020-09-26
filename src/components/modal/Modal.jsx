import "./Modal.scss"
import React from "react";
import ReactDOM from "react-dom"

export default function Modal({children, isModalShown, style, onModalClose}) {

    if (!isModalShown) return null

    // We use mouse down to not fire the event when the user hold the click and move mouse
    function handleModalClose() {
        onModalClose()
    }

    return ReactDOM.createPortal(
        <div className="modal">
            <div className="modal__overlay" onMouseDown={handleModalClose}>
            </div>
            <div className="modal__wrapper" style={style}>
                <div className="modal__inner">
                    {children}
                </div>
            </div>
        </div>
        , document.querySelector("body"))
}
