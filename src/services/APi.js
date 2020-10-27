import { get, post } from './request';

const BASE_URL = 'http://localhost:9001';

export const getPosts = async () => await get(BASE_URL, '/posts');

export const getPost = async id => await get(BASE_URL, `/posts/${id}`);

export const getComments = async id => {
    return await get(BASE_URL, `/posts/${id}/comments`);
};

export const addComment = async (id, data) => {
    return await post(BASE_URL, `/posts/${id}/comments`, data);
};
