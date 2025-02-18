const express = require('express');
const router = express.Router();
const FindUserTeamsService = require('../../services/user/findUserTeams');
const findUser = require('../../services/user');

router.get('/', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const getUserID = await findUser.findUserID(token);
        const userTeams = await FindUserTeamsService.findUserTeams(getUserID.user.id);
        res.json(userTeams);
    }catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
);
module.exports = router;