const express = require('express');
const router = express.Router();
const FormToCreateTeamService = require('../../services/createTeam');

router.post('/', async (req, res)=> {
    const data = req.body;
    const response = await FormToCreateTeamService.createTeam(data);

    console.log(`responseeeeee`, response);

    if (response.success) {
        res.status(201).json({
          message: 'Form submission successfull.',
          data: response.data,
        });
      } else {
        res.status(400).json({
          message: 'You already have active form filled out.',
          error: response.error,
        });
      }
})

module.exports = router;