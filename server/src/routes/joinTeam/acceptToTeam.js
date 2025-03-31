const express = require('express');
const router = express.Router();
const JoinTeamService = require('../../services/joinTeam');

router.post(`/`, async (req, res) => {
    const { notificationId, senderId } = req.body;
    console.log(`notificationId`, notificationId);
    console.log(`senderId`, senderId);
    const token = req.headers.authorization;

    try {
        const response = await JoinTeamService.acceptToTeam(token, notificationId, senderId);
        console.log(`response`, response);
        if (response.success) {
            res.status(200).json({
                message: 'Form submission successful.',
                data: response.data,
            });
        } else {
            res.status(400).json({
                message: response.message,
                error: response.error,
            });
        }
    } catch (error) {
        console.error("Error accepting to team:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
);

module.exports = router;