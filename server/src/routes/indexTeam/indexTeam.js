const express = require('express');
const router = express.Router();
const TeamIndexService = require('../../services/TeamIndexService');

router.get('/', async(req, res) => {
    try {
        const response = await TeamIndexService.getTeams(req.headers.authorization);
        res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

router.get('/getTeamById/:teamId', async (req, res) => {
    try {
        const response = await TeamIndexService.getTeamById(req.params.teamId, req.headers.authorization);
        
        if (!response.success) {
            console.error("Error fetching team:", response.error);
        }

        res.status(response.success ? 200 : 404).json(response);
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/deleteTeam/:teamId', async (req, res) => {
    try {
        const response = await TeamIndexService.deleteTeam(req.params.teamId);
        res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
);


module.exports = router;