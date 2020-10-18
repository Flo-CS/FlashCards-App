import React from "react";
import "./ControlsGroup.scss";

function ControlsGroup({children}) {
    return <div className="ControlsGroup">{children}</div>;
}

export default React.memo(ControlsGroup);