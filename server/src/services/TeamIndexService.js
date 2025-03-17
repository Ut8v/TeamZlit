const { response } = require('express');
const {prisma, Prisma} = require('../database/index');
const findUser = require('./user/index');

class TeamIndexService {
    static async getTeams(token) {
        try {
            let userFromToken = await findUser.findUserID(token);
            console.log(`userFromToken`, userFromToken);
            const teams = await prisma.createTeam.findMany(
                {
                    where: {
                        visibility: "public",
                        user_id: {
                            not: userFromToken.user.id
                        }
                    }
                }

            );

            return {
                success: true,
                data: teams
            };
        } catch(error) {
            console.error("Error fetching teams:", error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    static async getTeamById(teamId) {
        try {
            const team = await prisma.createTeam.findUnique({
                where: { id: Number(teamId) }
            });
            
            if (!team) {
                return {
                    success: false,
                    error: "Team not found"
                };
            }

            return {
                success: true,
                data: team
            };
        } catch(error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = TeamIndexService;