const express = require('express');
const router = express.Router();
const TeamIndexService = require('../../services/TeamIndexService');

router.get('/', async(req, res) => {
    try {
        const response = await TeamIndexService.getTeams();

        res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

module.exports = router;