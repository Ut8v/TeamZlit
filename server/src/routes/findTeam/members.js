const express = require('express');
const router = express.Router();
const FormToFindTeamService = require('../../services/findTeam');

router.get('/', async (req, res) => {
    const teamId = req.query.teamId;
    console.log(req.query, "Request body for fetching members");

    if (!teamId) {
        return res.status(400).json({
            message: 'Team ID is required.',
        });
    }
    try {
        const response = await FormToFindTeamService.findMember(teamId);
        if (response.success) {
            res.status(200).json({
                message: 'Members fetched successfully.',
                data: response.data,
            });
        } else {
            res.status(400).json({
                message: 'Failed to fetch members.',
                error: response.error,
            });
        }
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
);

module.exports = router;