import React from "react"
import PropTypes from "prop-types"
import ClassNames from "classnames"

import styles from "./Input.module.scss"


function Input({value, type, disabled, onChange}) {
    const inputClasses = ClassNames(styles.input)

    return <input className={inputClasses}
                  type={type}
                  value={value}
                  disabled={disabled}
                  onChange={onChange}/>
}

Input.propTypes = {
    value: PropTypes.string,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
}

Input.defaultProps = {
    value: "",
    disabled: false,
    onChange: () => null,
    type: "text",
}


export default React.memo(Input)