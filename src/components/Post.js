import React  from 'react';
import PropTypes from 'prop-types';
import { parseDate } from '../helpers';

import Icon from './Icon';

const Post = ({ post }) => {

    const { title, description, author, publish_date, content } = post;
    return (
        <div className="">
            <h1 className="text-3xl md:text-4xl font-bold mb-0">{title}</h1>
            <h2 className="text-xl md:2xl text-gray-600">{description}</h2>
            <div className="my-4">
                <p><i> <Icon type='user' color='blue' /> By: {author}</i></p>
                <p className="italic">Published: {parseDate(publish_date)}</p>
            </div>
            <div>
                <p>{(content || '').replace(/<\/?p>/g, '')}</p>
            </div>
        </div>
    );
};

Post.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        author: PropTypes.string,
        content: PropTypes.string,
        publish_date: PropTypes.string
    })

};

export default Post;
