const express = require('express');
const router = express.Router();
const JoinTeamService = require('../../services/joinTeam');

router.post('/', async (req, res) => {
    const teamId = req.body.teamId;
    const token = req.headers.authorization;
  
    const response = await JoinTeamService.JoinTeam(token, teamId);
    console.log(`response`, response);
    if (response.success) {
        res.status(201).json({
            message: 'Form submission successful.',
            data: response.data,
        });
    } else {
        res.status(400).json({
            message: response.message,
            error: response.error,
        });
    }

});

module.exports = router;