import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../components/Icon';

function Button({ disabled, label, type, htmlFor, bg, color, isLoading }) {

    console.log('%cButton.js line:8 isLoading', 'color: #007acc;', isLoading);

    console.log('%cButton.js line:8 "button"', 'color: #007acc;', "button");
    return !disabled ? (
        <button
            className={`py-2 bg-${bg}-400 text-${color} rounded-sm`}
            htmlFor={htmlFor}
            type={type}
        >
            {label}
        </button>
    ) : (
            <button
                onClick={e => e.preventDefault()}
                className="focus:outline-none cursor-not-allowed py-2 bg-gray-400 text-white rounded-sm"
            >
                {isLoading ? <Icon spin type="loading" /> : label}
            </button>
        );
}

Button = React.memo(Button);

Button.propTypes = {
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    label: PropTypes.string.isRequired,
    htmlFor: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    bg: PropTypes.string,
};

Button.defaultProps = {
    disabled: false,
    color: 'white',
    bg: 'green',
};

export default Button;
