const express = require(`express`);
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const bodyParser = require('body-parser');
const cors = require('cors');
const findTeamRoutes = require('./routes/findTeam/findTeam.js');
const createTeamRoutes = require('./routes/createTeam/createTeam.js');
//const createUserRoutes = require('./routes/createUser/createUser');
const matchUserToTeamRoutes = require('./routes/matchUserToTeam.js');
const matchTeamToUserRoutes = require('./routes/matchTeamToUser.js');
const indexTeamRoutes = require('./routes/indexTeam/indexTeam.js');
const getUserProfileRoutes = require('./routes/getUserProfile/getUserProfile.js');
const getUserTeamsRoutes = require('./routes/findUserTeams/findUserTeams.js');
const rateLimit = require('express-rate-limit');
const authenticateUser = require('./authMiddleware/authMiddleware');

app.use(cors({
    origin: process.env.URL, 
    methods: ['GET','PUT', 'POST', 'DELETE'],
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

//find Team routes  
app.use('/finduserTeams', authenticateUser, findTeamRoutes); //route to find teams

//create team routes  
app.use('/createTeam', authenticateUser, createTeamRoutes); //route to create teams

//create user routes
//app.use('/createUser', authenticateUser, createUserRoutes); [Depricated route, not used]

//Match the user to the team.  
app.use('/matchTheUser', authenticateUser, matchUserToTeamRoutes); //route to match user to team

//Match the team to the user. 
app.use('/matchTeamToUser', authenticateUser, matchTeamToUserRoutes); //route to match team to user

app.use('/indexTeam', authenticateUser, indexTeamRoutes); //route to index teams browser

app.use('/userProfile', authenticateUser, getUserProfileRoutes); //route to get user profile

app.use('/userTeams', authenticateUser, getUserTeamsRoutes);//route to get user teams

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`);
});

module.exports = app;


