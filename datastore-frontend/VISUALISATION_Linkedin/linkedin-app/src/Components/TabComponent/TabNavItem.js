import React from "react";

const TabNavItem = ({ id, title }) => {
    const handleClick = () => {
        window.location.reload();
    };

    return (
        <li onClick={handleClick}>
            {title}
        </li>
    );
};

export default TabNavItem;
