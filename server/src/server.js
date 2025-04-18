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
const getUserTeamsRoutes = require('./routes/findUserTeams/findUserTeams');
const checkActiveFormRoutes = require('./routes/checkUserForms/checkUserForms');
const formContentRoutes = require('./routes/formContent/getFormcontent');
const myMatchedTeamsRoutes = require('./routes/myMatchedTeams/myMatchedTeams');
const jointeamRoutes = require('./routes/joinTeam/joinTeam');
const userListRoutes = require('./routes/userList/userList');
const createPostRoutes = require('./routes/createPost/createPost');
const indexPostRoutes = require('./routes/indexPost/indexPost');
const notificationRoutes = require('./routes/notifications/noti');
const acceptUserToTeamRoutes = require('./routes/joinTeam/acceptToTeam');
const membersRoutes = require('./routes/findTeam/members');

const rateLimit = require('express-rate-limit');
const authenticateUser = require('./authMiddleware/authMiddleware');

app.set('trust proxy', 1);

app.use(cors({
    origin: process.env.URL, 
    methods: ['GET','PUT', 'POST', 'DELETE'],
    credentials: true
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.MAX_REQUESTS,
    message: "Too many requests, please try again later."
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//middleware to log requests
app.use((req, res, next) => {
    console.log(`Received ${req.method} request at ${req.originalUrl}`);
    next();
});

//find Team routes  
app.use('/findTeam', authenticateUser, findTeamRoutes); //route to find teams

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

app.use('/activeFormCheck', authenticateUser, checkActiveFormRoutes);//route to check active form

app.use('/formContent', authenticateUser, formContentRoutes);//route to get form content

app.use('/getMyMatchedTeams', authenticateUser, myMatchedTeamsRoutes);//route to get my matched teams);

app.use('/userList', authenticateUser, userListRoutes);//route to get user list

//create Post routes
app.use('/createPost', createPostRoutes);
app.use('/indexPost', indexPostRoutes);

app.use('/joinTeam', authenticateUser, jointeamRoutes);//route to join team

app.use('/notification', authenticateUser, notificationRoutes); //route to fetch user notifications.

app.use('/acceptUserToTeam', authenticateUser, acceptUserToTeamRoutes); //route to accept user to team

app.use('/members', authenticateUser, membersRoutes); 



app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`);
});

module.exports = app;


