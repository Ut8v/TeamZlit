const express = require('express');
const router = express.Router();
const FormToCreatePostService = require('../../services/createPost');

router.post('/', async (req, res)=> {
    const data = req.body;
    const response = await FormToCreatePostService.createPost(data);

    if (response.success) {
        res.status(201).json({
          message: 'Post created successfully.',
          data: response.data,
        });
      } else {
        res.status(400).json({
          message: 'Error creating post.',
          error: response.error,
        });
      }
})

module.exports = router;