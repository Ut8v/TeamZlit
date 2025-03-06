const { response } = require('express');

const {prisma, Prisma} = require('../database/index');
const Match = require('../utils/match');
const matchMaker = require('../utils/tenserflow/train');
// This service is responsible for matching a user to a team.
class FormToMatchUserToTeamService {

    static async matchUserToTeam(data, userID){
       const teams =  await prisma.createTeam.findMany({
        select: {
            id: true,
            email: true,
            teamName: true,
            teamDescription: true,
            teamType: true,
            roles: true,
            skills: true,
            visibility: true,
            additionalNotes: true || [],
            //TODO: add more fields to select after form is completed.
        },
        where: {
            user_id: {
                not: userID
            }
        }
       });

         //const matchType =  await Match(data, teams);

         const matchType = await Promise.all(
            teams.map(async (team) => {
                const matchPercentage = await matchMaker({
                    userData: data.formData.skills,
                    teamData: team.skills,
                });
                return {
                    id: team.id,
                    team,
                    matchPercentage : matchPercentage * 100,
                };
            })
        );      
        const matches = matchType.filter((match) => match.matchPercentage > 50)  
        
        const addMatchedTeamsToUser = await Promise.all(
            matches.map((match) =>
                prisma.userMatchedTeams.create({
                    data: {
                        user_id: userID,
                        team_id: match.id,
                        match_percentage: match.matchPercentage,
                    },
                })
            )
        );
         return { success: true, data: matches};
    }
}

module.exports = FormToMatchUserToTeamService;