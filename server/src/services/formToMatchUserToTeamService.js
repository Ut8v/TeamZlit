const { response } = require('express');

const {prisma, Prisma} = require('../database/index');
const Match = require('../utils/match');
const matchMaker = require('../utils/tenserflow/train');
// This service is responsible for matching a user to a team.
class FormToMatchUserToTeamService {

    static async matchUserToTeam(data){
       const teams =  await prisma.createTeam.findMany({
        select: {
            email: true,
            teamName: true,
            teamDescription: true,
            teamType: true,
            roles: true,
            skills: true,
            visibility: true,
            additionalNotes: true || [],
            //TODO: add more fields to select after form is completed.
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
                    team,
                    matchPercentage : matchPercentage * 100,
                };
            })
        );        
         return { success: true, data: matchType.filter((match) => match.matchPercentage > 50) };
    }
}

module.exports = FormToMatchUserToTeamService;