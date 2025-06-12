import React from "react";
import PrimaryBorder from "../PrimaryBorder/PrimaryBorder";

function Box({ children, className }) {
    return (
        <div className={`relative backdrop-blur-[10px] bg-purple-100/8 rounded-[10px] p-5 ${className}`}>
            <PrimaryBorder />
            {children}
        </div>
    );
}

export default Box;
