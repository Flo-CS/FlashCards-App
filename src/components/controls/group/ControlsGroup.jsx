import React from "react"
import PropTypes from "prop-types"
import "./ControlsGroup.scss"

function ControlsGroup({children}) {
    return <div className="ControlsGroup">
        {children}
    </div>
}

ControlsGroup.propTypes = {
    children: PropTypes.node.isRequired
}

export default React.memo(ControlsGroup)