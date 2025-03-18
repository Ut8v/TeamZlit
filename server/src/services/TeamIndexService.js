const { response } = require('express');
const {prisma, Prisma} = require('../database/index');
const findUser = require('./user/index');

class TeamIndexService {
    static async getTeams(token) {
        try {
            let userFromToken = await findUser.findUserID(token);
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
            return {
                success: false,
                error: error.message
            };
        }
    }

    static async getTeamById(teamId, token) {
        try {
            let userFromToken = await findUser.findUserID(token);
            const team = await prisma.createTeam.findUnique({
                where: { id: Number(teamId) }
            });

            const myTeam = team.user_id === userFromToken.user.id;
            
            if (!team) {
                return {
                    success: false,
                    error: "Team not found"
                };
            }

            return {
                success: true,
                data: {...team, isMyTeam: myTeam}
            };
        } catch(error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    static async deleteTeam(teamId) {
        try {
            const team = await prisma.createTeam.delete({
                where: { id: Number(teamId) }
            });

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