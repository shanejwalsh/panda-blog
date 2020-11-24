import React, { useEffect, useState } from 'react';
import PostTitleCard from '../components/PostCard';
import SearchAndFilterContainer from './SearchAndFilterContainer';

import Loading from '../components/Loading';
import { sortPosts } from '../helpers';
import { getPosts } from '../services/APi';

const PostsContainer = () => {
    const [loading, setLoading] = useState(true);

    const [originalPosts, setOriginalPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');

    const [postsToDisplay, setPostsToDisplay] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [unreadFilter, setUnreadFilter] = useState(false);

    const isPreviouslyRead = id => localStorage.getItem(`post-${id}`);

    const renderPostCards = (posts) => {
        return posts.map(post => (
            <PostTitleCard
                key={post.id}
                post={post}
                isPreviouslyRead={isPreviouslyRead(post.id)}
            />
        ));
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

    const postFilter = post => {
        post.author.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        || post.title.toLowerCase().includes(searchTerm.toLowerCase());
    };

    const setFilters = () => {
        let posts = originalPosts.filter(postFilter);

        if (unreadFilter) {
            posts = posts.filter(post => !isPreviouslyRead(post.id));
        }

        return posts;
    };

    useEffect(() => {
        getPosts()
            .then(fetchedPosts => {
                setOriginalPosts(fetchedPosts);
                setPostsToDisplay(sortPosts(fetchedPosts, sortOrder));
            })
            .catch(() => setApiError(true))
            .then(() => setLoading(false));
    }, []);

    useEffect(() => {
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
        <div className="margin-auto p-12">
            <h1 className="text-4xl md:text-6xl font-bold my-4">Panda Posts</h1>

            { apiError ? <div className="text-2xl">Unable to fetch posts 😢</div> :
                <>
                    <Loading loading={loading}>
                        <>
                            <SearchAndFilterContainer
                                handleSearchChange={handleSearch}
                                searchValue={searchTerm}
                                sortOrder={sortOrder}
                                handleSortChange={handleSortChange}
                                handleFilterChange={handleUnreadChange}
                            />

                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {postsToDisplay.length ?
                                    renderPostCards(postsToDisplay)
                                    : <p>No Posts Found, try searching for something else...</p>
                                }
                            </div>
                        </>
                    </Loading>
                </>
            }
        </div>
    );
};

export default PostsContainer;
