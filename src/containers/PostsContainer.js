import React, { useEffect, useState } from 'react';
import PostTitleCard from '../components/PostCard';
import SearchAndFilterContainer from './SearchAndFilterContainer';

import { sortPosts, debounce } from '../helpers';
import * as API from '../services/APi';


const PostsContainer = () => {
    const [originalPosts, setOriginalPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');

    const [postsToDisplay, setPostsToDisplay] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [unreadFilter, setUnreadFilter] = useState(false);


    const isPreviouslyRead = id => localStorage.getItem(`post-${id}`);

    const renderPostCards = (posts) => {

        return  posts.map(post => {
            return (
                <PostTitleCard
                    key={post.id}
                    post={post}
                    isPreviouslyRead={isPreviouslyRead(post.id)}
                />
            );
        });
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const handleUnreadChange = () => {
        setUnreadFilter(!unreadFilter);
    };

    const handleSortChange = event => {
        setSortOrder(event.target.value);
    };

    const fetchPosts = async () => {
        try {
            const fetchedPosts = await API.getPosts();
            setOriginalPosts(fetchedPosts);
            setPostsToDisplay(sortPosts(fetchedPosts, sortOrder));
        } catch (error) {
            setApiError(true);
        }
    };

    const setFilters = () => {
        let posts = originalPosts.filter(post =>
            post.author.toLowerCase().includes(searchTerm.toLocaleLowerCase())
                || post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (unreadFilter) {
            posts = posts.filter(post => !isPreviouslyRead(post.id));
        }

        return posts;
    };

    useEffect(() => {
        if (!originalPosts.length) {
            fetchPosts();
        }

        let posts;

        if (!searchTerm && !unreadFilter) {
            posts = [...originalPosts];

        } else {
            posts = (setFilters());
        }

        setPostsToDisplay(sortPosts(posts, sortOrder));

    }, [
        searchTerm,
        unreadFilter,
        sortOrder
    ]);

    return (
        <>
            <div className="margin-auto p-12">
                <h1 className="text-4xl md:text-6xl font-bold my-4">Panda Posts</h1>

                <SearchAndFilterContainer
                    handleSearchChange={handleSearch}
                    searchValue={searchTerm}
                    sortOrder={sortOrder}
                    handleSortChange={handleSortChange}
                    handleFilterChange={handleUnreadChange}
                />

                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {apiError
                        ? <h2 className="text-3xl font-bold">Unable to get posts, please try again.</h2>
                        : renderPostCards(postsToDisplay)}
                </div>
            </div>
        </>
    );
};

export default PostsContainer;
