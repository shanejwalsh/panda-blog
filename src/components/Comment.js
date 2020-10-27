import React from 'react';
import PropTypes from 'prop-types';
import { parseDate } from '../helpers';

import Icon from './Icon';

const Comment = ({ content, user, date }) => {
    return (
        <>
            <div>
                <div>
                    <span className="mb-2"><Icon type='user' /> {user}</span>


                    <p className="italic text-gray-600">{parseDate(date)}</p>
                </div>
                <div>{content}</div>
            </div>
            <hr className="my-4" />
        </>
    );
};

Comment.propTypes = {
    content: PropTypes.string,
    user: PropTypes.string,
    date: PropTypes.string

};

export default Comment;
