import "./Modal.scss"
import React, {useRef} from "react";
import PropTypes from "prop-types"
import ReactDOM from "react-dom"

import {Transition} from "react-transition-group";
import useOnClickOutside from "../../hooks/useOnClickOutside";


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

function Modal({children, onModalClose}) {
    const modalWrapperRef = useRef()
    useOnClickOutside(modalWrapperRef, () => {
        handleModalClose()
    })

    function handleModalClose() {
        onModalClose()
    }

    return ReactDOM.createPortal(
        <Transition in={true} timeout={0} appear>
            {(state) => (
                <div className="Modal">
                    <div className="Modal__Overlay">
                    </div>
                    <div className="Modal__Wrapper" ref={modalWrapperRef}
                         style={{...defaultModalStyle, ...modalTransitionStyles[state]}}>
                        <div className="Modal__Inner">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </Transition>
        , document.querySelector("body"))
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onModalClose: PropTypes.func.isRequired
};

export default React.memo(Modal)