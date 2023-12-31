import React from "react";

const Card = ({ className, children }) => {
    return (
        <div className={`shadow-xl text-center bg-gradient-to-b text-black ${className}`}>
            {children}
        </div>
    )
}

export default Card;