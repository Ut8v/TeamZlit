const express = require('express');
const router = express.Router();
const GetUserProfile = require('../../services/getUserProfile');
const { data } = require('@tensorflow/tfjs');

router.get('/', async (req, res) => {
    try {
        const userInfo = await GetUserProfile.getUserProfile(req.headers.authorization);
        res.json(userInfo);
    }catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.put('/', async (req, res) => {
    try {
        const userInfo = await GetUserProfile.updateUserProfile(req.headers.authorization, req.body);
        if (userInfo.success) {
            res.status(204).json({ success: true, message: 'Profile updated successfully.' });
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
}
);


module.exports = router;