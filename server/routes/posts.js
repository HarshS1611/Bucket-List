import express from 'express';

import {getPosts , createPosts} from '../controllers/posts.js';

const Router = express.Router();

Router.get('/',getPosts);
Router.post('/',createPosts);

export default Router;