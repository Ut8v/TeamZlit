const express = require(`express`);
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const bodyParser = require('body-parser');
const cors = require('cors');
const findTeamRoutes = require('./routes/findTeam/findTeam');

app.use(cors({
    origin: process.env.URL, 
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//find Team routes 
app.use('/findTeam', findTeamRoutes);

app.listen(PORT, ()=> {
    console.log(`server running`);
});

module.exports = app;


