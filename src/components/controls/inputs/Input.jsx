import React from "react"
import PropTypes from "prop-types"

import "./Input.scss"

function Input({value, type, disabled, placeholder, onChange, onKeyDown}) {

    return <input className="Input"
                  type={type}
                  value={value}
                  disabled={disabled}
                  onChange={onChange}
                  placeholder={placeholder}
                  onKeyDown={onKeyDown}/>
}

Input.propTypes = {
    value: PropTypes.string,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string
}

Input.defaultProps = {
    value: "",
    disabled: false,
    onChange: () => null,
    onKeyDown: () => null,
    type: "text",

}


export default React.memo(Input)