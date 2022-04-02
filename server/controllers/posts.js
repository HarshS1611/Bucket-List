import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

import postsdb from '../models/postsdb.js';

export const getPosts = async (req, res) => {
    try {
        const postdb = await postsdb.find();
        res.status(200).json(postdb);
    } catch (error) {

        res.status(404).json({ message: error });
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
export const getPost = async (req, res) => {
    try {
        const postdb = await postsdb.findById(req.params.id);
        res.status(200).json(postdb);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, message, creator, selectedFile, tags } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
        await postsdb.findByIdAndUpdate(id, updatedPost);
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        const post = await postsdb.findById(id);

        const updatedPost = await postsdb.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        await postsdb.findByIdAndRemove(id);
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default router;