const express = require('express');
const router = express.Router();
const GetUserList = require('../../services/user/userList');

router.get('/', async (req, res) => {
    try {
        const response = await GetUserList.getUserList(req.headers.authorization);
        if (response.success) {
            res.status(200).json({
                message: 'Successfully retrieved user list.',
                data: response.data,
            });
        } else {
            res.status(400).json({
                message: 'Failed to retrieve user list.',
                error: response.error,
            });
        }
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
);

module.exports = router;