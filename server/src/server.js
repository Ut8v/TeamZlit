const express = require(`express`);
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const bodyParser = require('body-parser');
const cors = require('cors');
const findTeamRoutes = require('./routes/findTeam/findTeam');
const createTeamRoutes = require('./routes/createTeam/createTeam');
const matchUserToTeamRoutes = require('./routes/matchUserToTeam');
const matchTeamToUserRoutes = require('./routes/matchTeamToUser');
const indexTeamRoutes = require('./routes/indexTeam/indexTeam');
const rateLimit = require('express-rate-limit');

app.use(cors({
    origin: process.env.URL, 
    methods: ['GET', 'POST'],
    credentials: true
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 80, // limit each IP to 80 requests per windowMs
    message: "Too many requests, please try again later."
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//find Team routes      //todo add permission checker middleware
app.use('/findTeam', findTeamRoutes);

//create team routes   //todo add permission checker middleware
app.use('/createTeam', createTeamRoutes);

//Match the user to the team.   //todo add permission checker middleware
app.use('/matchTheUser', matchUserToTeamRoutes); 

//Match the team to the user.  //todo add permission checker middleware
app.use('/matchTeamToUser', matchTeamToUserRoutes);

app.use('/indexTeam', indexTeamRoutes);

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`);
});

module.exports = app;


