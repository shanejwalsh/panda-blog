// containst actual post on mount, makes resquest for comments
// will have post component, comment section component
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Post from '../components/Post';
import CommentSection from '../components/CommentSection';
import { getPost } from '../services/APi';

//check for router props
const PostContainer = props => {

    const [post, setPost] = useState({});

    //checks if current post is passed in via router props, if not fetches from the network
    const setCurrentPost = async () => {
        if (props.location.state) {
            return props.location.state.post;
        }
        return getPost(props.match.params.id);
    };

    useEffect(() => {
        const displayCurrentPost = async () => {
            const postToDisplay = await setCurrentPost();
            setPost(postToDisplay);

            if (!localStorage.getItem(`post-${postToDisplay.id}`)) {
                localStorage.setItem(`post-${postToDisplay.id}`, true );
            }
        };

        displayCurrentPost();

    }, []);

    return (
        <div className="m-auto p-10 md:p-15 max-w-4xl">
            <Post post={post}/>
            <hr className="my-4"></hr>
            <CommentSection postId={post.id} />
        </div>
    );
};

PostContainer.propTypes = {
    match: PropTypes.shape({
        params: {
            id: PropTypes.number,
        }
    }),
    location: PropTypes.shape({
        state: {
            post: PropTypes.object,
        }
    })

};

export default PostContainer;
