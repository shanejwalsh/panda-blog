import React from 'react';
import PropTypes from 'prop-types';
import LoadingOverlay from 'react-loading-overlay';

const Loading = ({ loading, children }) => (
    <LoadingOverlay
        className={''}
        active={loading}
        spinner
        text='Finding Posts ...'
        style={{color: 'red'}}
    >
        {children}
    </LoadingOverlay>
);

Loading.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.element,
};

export default Loading;
