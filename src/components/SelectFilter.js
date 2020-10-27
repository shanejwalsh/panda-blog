import React from 'react';
import PropTypes from 'prop-types';

const SelectFilter = ({ name, label,  onChange, options = []  }) => {
    return (
        <div className="w-full flex-1 mb-2 flex flex-col" >
            <label className='text-gray-600 text-sm' htmlFor={name} >{label}</label>
            <select
                id={name}
                name={name}
                className="border p-1 "
                onChange={onChange}
            >
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}

            </select>
        </div>
    );
};

SelectFilter.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array

};

export default SelectFilter;
