import React from 'react';

const H3 = ({ children, className }) => {
    return <h3 className={`text-center text-1xl font-bold ${className}`}>{children}</h3>;
};

export default H3;
