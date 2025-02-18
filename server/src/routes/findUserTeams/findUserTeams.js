const express = require('express');
const router = express.Router();
const FindUserTeamsService = require('../../services/user/findUserTeams');
const findUser = require('../../services/user');

router.get('/', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const getUserID = await findUser.findUserID(token);
        console.log(`getting user teams for user: ${getUserID.user.id}`);
        const userTeams = await FindUserTeamsService.findUserTeams(getUserID.user.id);
        console.log(`Got user teams: ${userTeams}`);
        res.json(userTeams);
    }catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
);
module.exports = router;