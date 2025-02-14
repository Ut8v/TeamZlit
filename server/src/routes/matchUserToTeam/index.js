const express = require('express');
const router = express.Router();

const FormToMatchUserToTeamService = require('../../services/formToMatchUserToTeamService');

/*
/matchUserToTeam
This route is responsible for matching a user to a team.
*/
router.post('/', async (req, res)=> {
    const data = req.body;
    const response = await FormToMatchUserToTeamService.matchUserToTeam(data);

    console.log(`response`, response);

    if (response.success) {
        res.status(201).json({
          message: 'Found a match',
          data: response.data,
        });
      } else {
        res.status(400).json({
          message: 'No match found',
          error: response.error,
        });
      }
});

module.exports = router;