const {prisma, Prisma} = require('../database/index');
const findUser = require('./user/index');

class JoinTeamService {
    static async JoinTeam (token, teamId) {
        try {
            let userFromToken = await findUser.findUserID(token);

            const checkIfUserAlreadyRequested = await prisma.acceptedTeams.findFirst({
                where: {
                    user_id: userFromToken.user.id,
                    teamId: Number(teamId),
                }
            });

            if (checkIfUserAlreadyRequested) {
                return {success: false, message: "You have already requested to join this team."};
            }

            const teamOwner = await prisma.createTeam.findUnique({
                where: {
                    id: Number(teamId),
                },
                select: {
                    user_id: true,
                    id: true,
                }
            });

            const insertIntoAcceptedTeams = await prisma.acceptedTeams.create({
                data: {
                    user_id: userFromToken.user.id,
                    teamId: teamOwner.id,
                    accepted: 0,
                }
            })

            const insertIntoNotifications = await prisma.notifications.create({
                data: {
                    recipient_id: teamOwner.user_id,
                    message: `${userFromToken.user.user_metadata.full_name} wants to join your team`,
                    read: false,
                }

            })

            return { success: true, data: {} };
    } catch(error){
        console.log(`error`, error);
        return {success: false, error: error.message};
    }
    }
}

module.exports = JoinTeamService;