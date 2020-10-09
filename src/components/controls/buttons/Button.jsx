import React from "react"
import PropTypes from "prop-types"
import ClassNames from "classnames"

import styles from "./Button.module.scss"


function Button({children, color, size, disabled, Icon, onClick}) {
    const buttonClasses = ClassNames(styles.button, styles[size], styles[color])
    const iconClasses = ClassNames(styles.icon)

    return <button className={buttonClasses} onClick={onClick} disabled={disabled}>
        {<Icon className={iconClasses}/>}
        {children}
    </button>
}

Button.propTypes = {
    children: PropTypes.node,
    color: PropTypes.oneOf(["primary", "secondary", "tertiary", "danger"]).isRequired,
    size: PropTypes.oneOf(["square", "medium"]).isRequired,
    disabled: PropTypes.bool,
    Icon: PropTypes.elementType,
    onClick: PropTypes.func
}

Button.defaultProps = {
    children: null,
    disabled: false,
    Icon: () => null,
    onClick: () => null,
    color: "secondary",
    size: "medium"
}


export default React.memo(Button)