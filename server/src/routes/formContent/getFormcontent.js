const express = require('express');
const router = express.Router();
const activeForm = require('../../services/user/activeFormCheck');
const findUser = require('../../services/user');

router.get('/', async (req, res)=> {
    const token = req.headers.authorization;
    const getUserId = await findUser.findUserID(token);
    const response = await activeForm.getFormContent(getUserId.user.id);
    return res.json(response);
});

router.delete('/', async (req, res)=> {
    const token = req.headers.authorization;
    const getUserId = await findUser.findUserID(token);
    console.log(`getUserId`, getUserId);
    const response = await activeForm.deleteFormContent(getUserId.user.id, getUserId.user.email);
    
    if (response.success) {
        res.status(204).json({ success: true, message: 'Form deleted successfully.' });
    } else {
        res.status(400).json({ success: false, error: response.error });
    }
}
);

module.exports = router;