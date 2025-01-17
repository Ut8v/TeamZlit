const express = require('express');
const router = express.Router();
const TeamBrowserService = require('../../services/teamBrowser');

// GET /teams - Fetch all teams
// router.get('/teams', async (req, res) => {
//     const result = await TeamBrowserService.getAllTeams();
//     if (result.success) {
//       res.status(200).json(result.data);
//     } else {
//       res.status(500).json({ error: result.error });
//     }
//   });

router.get('/teams', (req, res) => {
    res.send('Teams route is working!');
});

module.exports = router;