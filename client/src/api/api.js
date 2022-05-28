import axios from 'axios';


const API = axios.create({ baseURL: 'https://bucketlist-backend16.herokuapp.com/' });


API.interceptors.request.use((req) => {
    if (localStorage.getItem('userProfile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userProfile')).token}`;
    }else{
        console.log("not logged in");
    }

    return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (postData) => API.post('/posts', postData);
export const updatePost = (id, postData) => API.patch(`posts/${id}`, postData);
export const deletePost = (id) => API.delete(`posts/${id}`);
export const likePost = (id) => API.patch(`posts/${id}/likepost`);
export const signIn = (userData) => API.post('/user/signin', userData);
export const signUp = (userData) => API.post('/user/signup', userData);
