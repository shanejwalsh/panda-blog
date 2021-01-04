import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const AddCommentForm = ({
    user,
    content,
    onSubmit,
    onUserChange,
    onContentChange,
    showError,
    isSubmitting,
}) => {
    return (
        <div className="my-5">
            <form className="flex flex-col" id="comment-form" name="comment-form" onSubmit={onSubmit}>
                <div className="my-2 flex flex-col">
                    <label className="text-gray-600 mb-1" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="border p-2"
                        id="name"
                        type="text"
                        placeholder="Enter your name..."
                        value={user}
                        onChange={onUserChange}
                    />

                </div>
                <div className="my-2 flex flex-col">
                    <label className="text-gray-600 mb-1" htmlFor="comment">Comment</label>
                    <textarea
                        className="border p-2"
                        id="comment"
                        placeholder="Add your comment..."
                        value={content}
                        onChange={onContentChange}
                    />
                </div>
                <Button
                    type='submit'
                    label='Add Comment'
                    disabled={!(content.length && user.length)}
                    htmlFor='comment-form'
                    isLoading={isSubmitting}
                />
            </form>

            {showError && <div className="text-red-600">Please fill out all fields</div>}
        </div>
    );
};

AddCommentForm.propTypes = {
    user: PropTypes.string,
    content: PropTypes.string,
    onSubmit: PropTypes.func,
    onUserChange: PropTypes.func,
    onContentChange: PropTypes.func,
    showError: PropTypes.bool,
    isSubmitting: PropTypes.bool
};

export default AddCommentForm;
