import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { parseDate } from '../helpers';

import Icon from './Icon';

function Comment({ content, user, date }) {
    return (
        <>
            <div>
                <div>
                <div className="mb-4">
                    <content>
                        {content}
                    </content>
                </div>
                <div className="text-sm">
                    <span className="mb-2"><Icon type='user' /> {user}</span>
                    {" | "}
                    <span className="italic text-gray-600">{parseDate(date)}</span>
                </div>
                </div>
            </div>
            <hr className="my-4" />
        </>
    );
};

Comment = React.memo(Comment);

Comment.propTypes = {
    content: PropTypes.string,
    user: PropTypes.string,
    date: PropTypes.string

};

export default Comment;
