const express = require('express');
const router = express.Router();
const FormToCreateTeamService = require('../../services/createTeam');
const findUser = require('../../services/user');

router.post('/', async (req, res)=> {
    const data = req.body;
    const token = req.headers.authorization;
    const getUserId = await findUser.findUserID(token);
    const response = await FormToCreateTeamService.createTeam(data, getUserId.user.id);

    if (response.success) {
        res.status(201).json({
          message: 'Form submission successful.',
          data: response.data,
        });
      } else {
        res.status(400).json({
          message: 'You already have an active form filled out.',
          error: response.error,
        });
      }
})

module.exports = router;