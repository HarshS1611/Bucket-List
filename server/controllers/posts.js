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
        const post = req.body;
        const newpostdb = new postsdb({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
        await newpostdb.save();
        res.status(201).json(newpostdb);
    } catch (error) {
        res.status(400).json({ message: error });
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
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await postsdb.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await postsdb.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
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