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
}

module.exports = TeamIndexService;