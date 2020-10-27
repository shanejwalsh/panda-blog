import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronRight, faChevronDown, faCircle, faComment } from '@fortawesome/free-solid-svg-icons';



const Icon = ({ type, color, className }) => {

    let iconType;

    switch(type) {
    case('user'):
        iconType = faUser;
        break;
    case('chevronRight'):
        iconType = faChevronRight;
        break;
    case('chevronDown'):
        iconType = faChevronDown;
        break;
    case('comment'):
        iconType = faComment;
        break;
    default:
        iconType = faCircle;
        break;
    }

    return (
        <FontAwesomeIcon className={`${className ? className : ''} mr-2 text-${color}-400`} icon={iconType} />
    );
};

Icon.propTypes = {
    color: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
};

export default Icon;
