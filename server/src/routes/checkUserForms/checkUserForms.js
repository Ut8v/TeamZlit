const express = require('express');
const router = express.Router();
const activeForm = require('../../services/user/activeFormCheck');
const findUser = require('../../services/user');

router.get('/', async (req, res)=> {
    const token = req.headers.authorization;
    const getUserId = await findUser.findUserID(token);
    const response = await activeForm.checkActiveForm(getUserId.user.id);
    return res.json(response);
});
module.exports = router;