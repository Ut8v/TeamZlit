const express = require('express');
const router = express.Router();
const FormToMatchTeamToUserService = require('../../services/formToMatchTeamToUser');

/* 
/matchTeamToUser
This route is responsible for matching a team to a user.
*/
router.post('/', async (req, res)=> {
    const data = req.body;
    const response = await FormToMatchTeamToUserService.matchTeamToUser(data);

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