const { response } = require('express');

const {prisma, Prisma} = require('../../database/index');

class MyMatches {
    static async myMatchedTeams(userId){

        try{
            const matchedTeams = await prisma.userMatchedTeams.findMany({
                where: {
                    user_id: userId
                }
            });

            const Teams = await prisma.createTeam.findMany({
                where: {
                    id: {
                        in: matchedTeams.map((team) => team.team_id)
                    }
                },
                select: {
                    id: true,
                    teamName: true,
                    teamDescription: true,
                }
            });

            return {success: true, data: matchedTeams};
        } catch(error){
            return {success: false, error: error.message};
        }
    }
}

module.exports = MyMatches;