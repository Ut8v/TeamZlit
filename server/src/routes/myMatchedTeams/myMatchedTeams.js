const express = require('express');
const router = express.Router();
const myMatches = require('../../services/myMatchedTeams/myMatchedTeams');
const findUser = require('../../services/user');
const {prisma, Prisma} = require('../../database/index');

router.get('/', async (req, res) => {
  const token = req.headers.authorization;
  const getUserId = await findUser.findUserID(token);
  const response = await myMatches.myMatchedTeams(getUserId.user.id);
  console.log(`response`, response);

  const allTeams = await prisma.createTeam.findMany({
    where: {
      id: {
        in: response.data.map((team) => team.team_id)
      }
    },
    select: {
      id: true,
      teamName: true,
      teamDescription: true
  }
  });


  const matchedTeams = allTeams.map((team) => {
    return {
      id: team.id,
      teamName: team.teamName,
      teamDescription: team.teamDescription,
      match_percentage: response.data.find((match) => match.team_id === team.id).match_percentage
    };
  }
  );

    if (response.success) {
        res.status(200).json({
        message: 'Successfully retrieved matched teams.',
        data: matchedTeams,
        });
    } else {
        res.status(400).json({
        message: 'Failed to retrieve matched teams.',
        error: response.error,
        });
    }
  
});

module.exports = router;