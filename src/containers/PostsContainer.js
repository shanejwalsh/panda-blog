import React, {useEffect, useState} from 'react';
import PostTitleCard from '../components/PostCard';
import SearchAndFilterContainer from './SearchAndFilterContainer';

import { sortOldestToNewest, sortNewestToOldest, debounce } from '../helpers';
import * as API from '../services/APi';

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

const PostsContainer = () => {

    const [posts, setposts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [order, setOrder] = useState('');
    const [unreadFilter, setUnreadFilter] = useState(false);

    const handleSearch = debounce(event => {
        const term = event.target.value.toLowerCase();

        let postsToDisplay = posts;

        if (unreadFilter) {
            postsToDisplay = postsToDisplay.filter((post =>!isPreviouslyRead(post.id)));
        }

        if (!term) {
            return setFilteredPosts(postsToDisplay);
        }

        setFilteredPosts(
            postsToDisplay.filter(post =>
                post.author.toLowerCase().includes(term) || post.title.toLowerCase().includes(term)
            )
        );
    }, 250);

    const handleUnreadChange = event => {
        const { value } = event.target;

        setUnreadFilter(!unreadFilter);

        if (value === 'all') {
            return setFilteredPosts(posts);
        }

        setFilteredPosts(
            posts.filter(post =>!isPreviouslyRead(post.id))
        );
    };

    const handleSortChange = event => {


        setOrder(event.target.value);

        let postsToDisplay = posts;

        if (unreadFilter) {
            postsToDisplay = postsToDisplay.filter((post =>!isPreviouslyRead(post.id)));
        }

        if (event.target.value === 'desc') {
            return  setFilteredPosts(sortNewestToOldest(postsToDisplay));
        }
        return  setFilteredPosts(sortOldestToNewest(postsToDisplay));
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await API.getPosts();
                setposts(sortOldestToNewest(fetchedPosts));
                setFilteredPosts(fetchedPosts);
            } catch (error) {
                setApiError(true);
            }
        };
        fetchPosts();

    } ,[]);

    return (
        <>
            <div className="margin-auto p-12">
                <h1 className="text-4xl md:text-6xl font-bold my-4">Panda Posts</h1>

                <SearchAndFilterContainer
                    handleSearchChange={(e) => handleSearch(e)}
                    handleSortChange={handleSortChange}
                    handleFilterChange={handleUnreadChange}
                />

                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {apiError
                        ? <h2 className="text-3xl font-bold">Unable to get posts, please try again.</h2>
                        : renderPostCards(filteredPosts)}
                </div>
            </div>
        </>
    );
};

export default PostsContainer;
