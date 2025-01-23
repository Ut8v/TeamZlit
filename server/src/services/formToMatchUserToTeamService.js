const { response } = require('express');

const {prisma, Prisma} = require('../database/index');
const Match = require('../utils/match');
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

         const matchType =  await Match(data, teams);
         return { success: true, data: matchType };
    }
}

module.exports = FormToMatchUserToTeamService;