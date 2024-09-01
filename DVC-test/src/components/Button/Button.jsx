import React from "react";
import './Button.scss';
import { Link, useLocation } from "react-router-dom";

const Button = (props) => {
    const {
        onClick,
        children,
        type,
        className,
        to,
        product,
        ...restProps
    } = props;

    const location = useLocation();
    const isActive = to === location.pathname

    let Element = to ? Link : 'button';


    return (
        <>
            <Element
                type={type}
                className={`${isActive ? 'active' : ''}`}
                onClick={onClick}
                to={to}
                {...restProps}
            >
                {children}
            </Element >
        </>
    )
}

export default Button