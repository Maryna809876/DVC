import React from "react";
import './Button.scss';
import { Link } from "react-router-dom";

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

    let Element = to ? Link : 'button'

    return (
        <>
            <Element
                type={type}
                className={className}
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