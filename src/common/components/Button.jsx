import React from 'react';
import { classNames } from '../../helpers/classNames';

// create custom button componnt
const Button = (props) => {
    const { children, className, variant, ...rest } = props;
    let buttonClass = 'bg-blue-500 hover:bg-blue-600 duration-300';
    if (variant === 'primary')
        buttonClass = 'bg-orange-500 hover:bg-orange-600';
    if (variant === 'danger') buttonClass = 'bg-red-600 hover:bg-red-700';
    if (variant === 'outlined')
        buttonClass =
            'bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white';

    return (
        <button
            {...rest}
            className={classNames(
                `${buttonClass} px-6 py-2 rounded text-white font-medium text-sm`,
                className
            )}
        >
            {children}
        </button>
    );
};

export default Button;
