const express = require('express');
const router = express.Router();
const FormToFindTeamService = require('../../services/findTeam');

router.post('/', async (req, res)=> {
    const data = req.body;
    const response = await FormToFindTeamService.findTeam(data);

    console.log(`response`, response);

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