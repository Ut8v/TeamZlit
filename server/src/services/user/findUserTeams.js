const {prisma, Prisma} = require("../../database/index");
class FindUserTeams {
    static async findUserTeams(userID) {
        console.log(userID, 'userID');
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
}
module.exports = FindUserTeams;