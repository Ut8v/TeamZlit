const { response } = require('express');

const {prisma, Prisma} = require('../database/index');
const Match = require('../utils/match');

// This service is responsible for matching a team to a user.
class FormToMatchTeamToUserService {

    static async matchTeamToUser(data){
       const user = await prisma.lookingForTeam.findMany({
        select: {
            username: true,
            email: true,
            skills: true,
            role: true,
            experienceLevel: true,
            availability: true,
            portfolio: true,
            additionalNotes: true || [],
        }
       });
         const matchType =  await Match(data, user);
         return { success: true, data: matchType };
    }
}

module.exports = FormToMatchTeamToUserService;