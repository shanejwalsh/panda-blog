//TODO RENAME TO POST TITLE CARD OR SOMETHIING

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from './Icon';

import { parseDate } from '../helpers';


const PostCard = ({ post, isPreviouslyRead }) => {

    const {
        id,
        title,
        author,
        description,
        publish_date,
    } = post;

    return (
        <div className="relative hover:shadow-lg p-4 rounded-lg hover:bg-gray-200 my-1 shadow-sm border border-gray transition-all duration-200">
            <Link
                to={{
                    pathname: `posts/${id}`,
                    state: { post },
                }}
            >
                {!isPreviouslyRead && <Icon color='blue' className= "absolute top-0 right-0 mt-4 h-2 w-2" />}
                <h1 className="font-bold text-100 text-2xl">{title}</h1>
                <h2 className="mb-3 text-grey-600 ">{description}</h2>

                <p>
                    <span>
                        {`By: ${author} | ${parseDate(publish_date)} `}
                    </span>
                </p>
            </Link>
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        author: PropTypes.string,
        description: PropTypes.string,
        publish_date: PropTypes.string,
        onClick: PropTypes.func,
    }),
    isPreviouslyRead: PropTypes.string,
};

export default PostCard;
