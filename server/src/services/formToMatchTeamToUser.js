const { response } = require('express');

const {prisma, Prisma} = require('../database/index');
const Match = require('../utils/match');
const matchMaker = require('../utils/tenserflow/train');
// This service is responsible for matching a team to a user.
class FormToMatchTeamToUserService {

    static async matchTeamToUser(data){
       const users = await prisma.lookingForTeam.findMany({
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
         //const matchType =  await Match(data, user);
         const matchType = await Promise.all(
            users.map(async (user) => {
                const matchPercentage = await matchMaker({
                    userData: user.skills,
                    teamData: data.formData.skills,
                });
                return {
                    user,
                    matchPercentage : matchPercentage * 100,
                };
            })
        );   
         return { success: true, data: matchType.filter((match) => match.matchPercentage > 50) };
    }
}

module.exports = FormToMatchTeamToUserService;