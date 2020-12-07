import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ disabled, label, type, htmlFor, bg, color }) => {
    return (
        !disabled ?
            <button
                className={`py-2 bg-${bg}-400 text-${color} rounded-sm`}
                htmlFor={htmlFor}
                type={type}>
                {label}
            </button>
            :
            <button
                onClick={e => e.preventDefault() }
                className="focus:outline-none cursor-not-allowed py-2 bg-gray-400 text-white rounded-sm"
            >
                {label}
            </button>

    );
};

Button.propTypes = {
    disabled: PropTypes.bool,
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
