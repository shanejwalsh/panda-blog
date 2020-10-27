import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ onChange, name, label }) => {
    return (
        <div className="flex-1 mb-2 w-full flex flex-col">
            <label
                className="text-gray-600 text-sm"
                htmlFor={name} >{label}</label>
            <input
                name={name}
                id={name}
                onChange={onChange}
                className='border p-1'
                type="text"
                placeholder='Search...'
            />
        </div>
    );
};

SearchInput.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
};

export default SearchInput;
