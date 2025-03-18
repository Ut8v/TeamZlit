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
            return { success: true, data: userTeams };
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
                }
            });

            const userTeams = await prisma.createTeam.findMany({
                where: {
                    user_id: user.user_id,
                },
                select: {
                    id: true,
                    teamName: true,
                    teamDescription: true,
                }
            });
            return { success: true, data: userTeams };
        } catch (error) {
            console.error("Error fetching user teams:", error);
            return { success: false, error: error.message };
        }
    }
}
module.exports = FindUserTeams;