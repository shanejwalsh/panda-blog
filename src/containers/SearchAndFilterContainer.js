import React from 'react';
import PropTypes from 'prop-types';

import SearchInput from '../components/SearchInput';
import SelectFilter from '../components/SelectFilter';

const SearchAndFilterContainer = ({ searchValue, handleSearchChange, handleSortChange, handleFilterChange}) => {
    return (
        <div className="my-2 sm:flex gap-4">
            <SearchInput
                onChange={handleSearchChange}
                name='search'
                label="Search"
                value={searchValue}
            />

            <SelectFilter
                name="sort-order"
                label={'Change Sort Order'}
                onChange={handleSortChange}
                options={[
                    {label: 'Oldest to newest', value: 'desc'},
                    {label: 'Newest to oldest', value: 'asc'}
                ]}
            />

            <SelectFilter
                name="filter-unread"
                label={'Show unread posts'}
                onChange={handleFilterChange}
                options={[
                    {label: 'All posts', value: 'all'},
                    {label: 'Unread Posts', value: 'unread'}
                ]}
            />
        </div>
    );
};

SearchAndFilterContainer.propTypes = {
    handleFilterChange: PropTypes.func,
    handleSortChange: PropTypes.func,
    handleSearchChange: PropTypes.func,
    searchValue: PropTypes.string,
};

export default SearchAndFilterContainer;
