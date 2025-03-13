const express = require('express');
const router = express.Router();
const FormToFindTeamService = require('../../services/findTeam');
const findUser = require('../../services/user');
router.post('/', async (req, res)=> {
    const data = req.body;
    const token = req.headers.authorization;
    const getUserId = await findUser.findUserID(token);
    const response = await FormToFindTeamService.findTeam(data, getUserId.user.id);

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