const router = require('express').Router();
const User = require('../models/User')
const Post = require('../models/Post');
// Create a post 
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Update a post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            await post.updateOne({ $set: req.body });
            res.status(200).json('The post has been updated');
        } else {
            res.status(403).json('You can only update your post');
        }
    } catch (error) {
        res.status(500).json(error)
    }
});
//Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            await post.deleteOne();
            res.status(200).json('The post has been deleted');
        } else {
            res.status(403).json('You can only delete your post');
        }
    } catch (error) {
        res.status(500).json(error)
    }
});


//Get post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
    res.status(500).json(error)
}
});

// Get all the posts/ get the post by username
router.get('/', async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).send(error);
    }
})
//Like & Dislike a post
router.put('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json('The post has been liked')
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json('The post has been disliked')
        }
    } catch (error) {

    }
})



module.exports = router;