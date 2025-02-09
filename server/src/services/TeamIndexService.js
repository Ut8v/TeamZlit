const { response } = require('express');
const {prisma, Prisma} = require('../database/index');

class TeamIndexService {
    static async getTeams() {
        try {
            const teams = await prisma.createTeam.findMany();
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