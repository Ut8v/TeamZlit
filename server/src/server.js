const express = require(`express`);
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const bodyParser = require('body-parser');
const cors = require('cors');
const findTeamRoutes = require('./routes/findTeam/findTeam');
const createTeamRoutes = require('./routes/createTeam/createTeam');
//const createUserRoutes = require('./routes/createUser/createUser');
const matchUserToTeamRoutes = require('./routes/matchUserToTeam');
const matchTeamToUserRoutes = require('./routes/matchTeamToUser');
const indexTeamRoutes = require('./routes/indexTeam/indexTeam');
const getUserProfileRoutes = require('./routes/getUserProfile/getUserProfile');
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
app.use('/findTeam', authenticateUser, findTeamRoutes);

//create team routes  
app.use('/createTeam', authenticateUser, createTeamRoutes);

//create user routes
//app.use('/createUser', authenticateUser, createUserRoutes); [Depricated route, not used]

//Match the user to the team.  
app.use('/matchTheUser', authenticateUser, matchUserToTeamRoutes); 

//Match the team to the user. 
app.use('/matchTeamToUser', authenticateUser, matchTeamToUserRoutes);

app.use('/indexTeam', authenticateUser, indexTeamRoutes);

app.use('/userProfile', authenticateUser, getUserProfileRoutes);

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`);
});

module.exports = app;


