const express = require('express');
const router = express.Router();
const Service = require('../../services/joinTeam');


router.get('/', async (req, res) => {
    try {
        const response = await Service.getNotifications(req.headers.authorization);
        console.log(`response`, response.data);
        if(response.success) {
            res.status(200).json({
                message: 'Notifications fetched successfully.',
                data: response.data,
            });
        }
        else {
            res.status(400).json({
                message: 'Failed to fetch notifications.',
                error: response.error,
            });
        }
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
);

router.post('/read', async (req, res) => {
    try {
        const response = await Service.readNotification(req.body.notificationId, req.headers.authorization);
        res.status(200).json(response);
    } catch (error) {
        console.error("Error reading notification:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
);

module.exports = router;