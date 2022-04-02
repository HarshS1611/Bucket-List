import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

import postsdb from '../models/postsdb.js';

export const getPosts = async (req, res) => {
    try {
        const postsdb = await postsdb.find();
        res.status(200).json(postsdb);
    } catch (error) {

        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {

    try {
        const newPostsdb = new postsdb(req.body);
        await newPostsdb.save();
        res.status(201).json(newPostsdb);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default router;