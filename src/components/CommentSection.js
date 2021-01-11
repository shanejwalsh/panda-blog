import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import AddCommentForm from './AddCommentForm';
import Comment from './Comment';
import Icon from './Icon';

import { getComments, addComment } from '../services/APi';

function CommentSection({ postId }){

    console.log('%cCommentSection.js line:11 "section"', 'color: #007acc;', "section");

    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [user, setUser] = useState('');
    const [commentsFetched, setCommentsFetched] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const clearInputs = () => {
        setContent('');
        setUser('');
    };

    const handleCommentSubmission = async e => {
        setShowError(false);

        e.preventDefault();

        if (!content || !user) {
            return setShowError(true);
        }

        addComment(postId, {
            postId,
            user,
            content,
            date: new Date(),
        }).then(newComment => {
            setComments([...comments, newComment]);
            clearInputs();
            setIsSubmitting(false);
        });
    };

    const toggleShowComments = () => setShowComments(!showComments);

    const handleShowCommentClick = React.useCallback(async () => {


        if (!commentsFetched) {
            const fetchedComments = await getComments(postId);
            setComments(fetchedComments);
            setCommentsFetched(true);
        }

        toggleShowComments();
    }, [postId, showComments]);

    return (
        <>
            <button
                style={{outline: 'none'}}
                className="outline-none"
                onClick={handleShowCommentClick}>
                <span className="mr-2">{showComments ? 'Hide' : 'Show'} Comments</span>
                {<Icon
                    type={showComments ?  'chevronDown' : 'chevronRight'}
                    className={'transition rotate-45'}
                />}
            </button>
            {showComments &&
                <div className="md:w-3/5">
                    <AddCommentForm
                        user={user}
                        content={content}
                        onSubmit={(e) => {
                            setIsSubmitting(true);
                            handleCommentSubmission(e)
                        }}
                        onUserChange={event => setUser(event.target.value)}
                        onContentChange={event => setContent(event.target.value)}
                        showError={showError}
                        isSubmitting={isSubmitting}
                    />
                    {comments.length ?
                        <>
                            <ul>
                                {comments.map(comment => {
                                    return (
                                        <li key={comment.id}>
                                            <Comment
                                                content={comment.content}
                                                user={comment.user}
                                                date={comment.date}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </>

                        : <div>Be first to leave a comment!</div>}
                </div>
            }
        </>
    );
};

CommentSection.propTypes = {
    postId: PropTypes.number,
};

export default CommentSection;
