import React from 'react';
import PropTypes from 'prop-types';

const LabelInput = ({ onChange, value, label, name, type }) => {
    return (
        <div className="my-2 flex flex-col">
            <label className="text-gray-600 mb-1" htmlFor={name}>
                {label}
            </label>
            <input
                className="border p-2"
                id={name}
                type={type}
                placeholder="Enter your name..."
                value={value}
                onChange={onChange}
            />

        </div>
    );
};

LabelInput.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string
};

export default LabelInput;
