const express = require('express');
const router = express.Router();
const PostIndexService = require('../../services/PostIndexService');

router.get('/', async(req, res) => {
    try {
        const response = await PostIndexService.getPosts();
        res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

router.get('/getPostById/:postId', async (req, res) => {
    try {
        const response = await PostIndexService.getPostById(req.params.postId);
        
        if (!response.success) {
            console.error("Error fetching post:", response.error);
        }

        res.status(response.success ? 200 : 404).json(response);
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/deletePost/:postId', async (req, res) => {
    try {
        const response = await PostIndexService.deletePost(req.params.postId);
        res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;

