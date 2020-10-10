import React from "react"
import PropTypes from "prop-types"
import ClassNames from "classnames"

import "./Button.scss"


function Button({children, color, size, disabled, Icon, onClick}) {
    const buttonClasses = ClassNames("Button", `Button--${size}`, `Button--${color}`)
    const iconClasses = ClassNames("Button__Icon")

    return <button className={buttonClasses} onClick={onClick} disabled={disabled}>
        {<Icon className={iconClasses}/>}
        {children}
    </button>
}

Button.propTypes = {
    children: PropTypes.node,
    color: PropTypes.oneOf(["Primary", "Secondary", "Tertiary", "Danger"]).isRequired,
    size: PropTypes.oneOf(["Square", "Medium", "Expand"]).isRequired,
    disabled: PropTypes.bool,
    Icon: PropTypes.elementType,
    onClick: PropTypes.func
}

Button.defaultProps = {
    children: null,
    disabled: false,
    Icon: () => null,
    onClick: () => null,
}


export default React.memo(Button)