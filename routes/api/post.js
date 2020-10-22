const express = require('express');
const router = express.Router();
const passport = require('passport');
const isAuth = require('../../middleware/is-auth')

// Controllers
const postController = require('../../controllers/post')
const commentController = require('../../controllers/comment')



router.get('/', postController.getPosts);

router.get('/:id', postController.getPost);

router.post('/',isAuth,postController.createPost);

router.delete('/:id',isAuth,postController.deletePost);

router.post('/like/:id',isAuth,postController.likePost);

router.post('/unlike/:id',isAuth, postController.unLikePost);

router.post('/comment/:id',isAuth,commentController.addComment);

router.delete('/comment/:id/:comment_id',isAuth,commentController.deleteComment);

module.exports = router;
