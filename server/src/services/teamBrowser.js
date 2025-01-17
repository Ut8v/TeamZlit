const { prisma } = require('../database/index');

class TeamBrowserService {
  /**
   * Fetch all teams
   * @returns {Promise<{success: boolean, data?: object[], error?: string}>}
   */
  static async getAllTeams() {
    try {
      // Query all teams, selecting only the fields needed for browsing
      const teams = await prisma.createTeam.findMany({
        select: {
          id: true,
          teamName: true,
        },
      });
      return { success: true, data: teams };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = TeamBrowserService;