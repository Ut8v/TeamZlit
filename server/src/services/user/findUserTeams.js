const {prisma, Prisma} = require("../../database/index");
class FindUserTeams {
    static async findUserTeams(userID) {
        try{
            const userTeams = await prisma.createTeam.findMany({
                where: {
                    user_id: userID,
                },
                select: {
                    id: true,
                    teamName: true,
                    teamDescription: true,
                }
            });

            const userJoinedTeamIds = await prisma.acceptedTeams.findMany({
                where: {
                    user_id: userID,
                    accepted: 1, 
                },
                select: {
                    teamId: true,
                }
            });

            const joinedTeamIds = userJoinedTeamIds.map((t) => t.teamId);

            const userJoinedTeams = await prisma.createTeam.findMany({
                where: {
                    id: { in: joinedTeamIds },
                    user_id: { not: userID }, 
                },
                select: {
                    id: true,
                    teamName: true,
                    teamDescription: true,
                }
            });

            const allTeams = [...userTeams, ...userJoinedTeams];

            return { success: true, data: allTeams };
        } catch(error){
            console.log(error, `error getting user teams`);
            return {success: false, error: error.message};
        }

    };

    static async getUserTeamsById(userId) {
        try {
          const user = await prisma.users.findUnique({
            where: {
              id: Number(userId),
            },
            select: {
              user_id: true,
            },
          });
      
          const userCreatedTeams = await prisma.createTeam.findMany({
            where: {
              user_id: user.user_id,
            },
            select: {
              id: true,
              teamName: true,
              teamDescription: true,
            },
          });
      
          const userJoinedTeamIds = await prisma.acceptedTeams.findMany({
            where: {
              user_id: user.user_id,
              accepted: 1,
            },
            select: {
              teamId: true,
            },
          });
      
          const joinedTeamIds = userJoinedTeamIds.map((t) => t.teamId);
      
          const userJoinedTeams = await prisma.createTeam.findMany({
            where: {
              id: { in: joinedTeamIds },
              user_id: { not: user.user_id }, 
            },
            select: {
              id: true,
              teamName: true,
              teamDescription: true,
            },
          });
      
          const allTeams = [...userCreatedTeams, ...userJoinedTeams];
      
          return {
            success: true,
            data: allTeams,
          };
        } catch (error) {
          console.error("Error fetching user teams:", error);
          return { success: false, error: error.message };
        }
      }
      
}
module.exports = FindUserTeams;