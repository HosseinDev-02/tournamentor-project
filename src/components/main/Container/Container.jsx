import React from "react";

function Container({children, className}) {
    return <div className={`container mx-auto w-full px-4 md:px-6 ${className}`}>
        {children}
    </div>;
}

export default Container;
