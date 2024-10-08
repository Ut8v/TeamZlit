const express = require(`express`);
require('dotenv').config();

const router = express();
const PORT = process.env.PORT;
router.listen(PORT, ()=> {
    console.log(`server running`);
});

module.exports = router;


