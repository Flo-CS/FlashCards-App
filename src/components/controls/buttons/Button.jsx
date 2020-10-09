import React from "react"
import PropTypes from "prop-types"
import ClassNames from "classnames"

import styles from "./Button.module.scss"


function Button({children, color, size, disabled, Icon, onClick}) {
    const classes = ClassNames(styles.button, styles[size], styles[color])

    return <button className={classes} onClick={onClick} disabled={disabled}>
        {<Icon className={styles.icon}/>}
        {children}
    </button>
}

Button.defaultProps = {
    color: "secondary",
    size: "medium",
    disabled: false,
    Icon: () => null,
    onClick: () => null
}

Button.propsTypes = {
    children: PropTypes.node,
    color: PropTypes.oneOf(["primary", "secondary", "tertiary", "danger"]),
    size: PropTypes.oneOf(["square", "medium"]),
    disabled: PropTypes.bool,
    Icon: PropTypes.func,
    onClick: PropTypes.func
}


export default Button