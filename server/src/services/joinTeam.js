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
                    teamName: true,
                }
            });

            const insertIntoAcceptedTeams = await prisma.acceptedTeams.create({
                data: {
                    user_id: userFromToken.user.id,
                    teamId: teamOwner.id,
                    accepted: 0,
                    team_ownerId: teamOwner.user_id,
                }
            })

            const insertIntoNotifications = await prisma.notifications.create({
                data: {
                    recipient_id: teamOwner.user_id,
                    message: `${userFromToken.user.user_metadata.full_name} wants to join your team ${teamOwner.teamName}`,
                    read: false,
                    teamId: teamOwner.id,
                    sender_id: userFromToken.user.id,
                    type: 'request',
                }

            })

            return { success: true, data: {} };
    } catch(error){
        console.log(`error`, error);
        return {success: false, error: error.message};
    }
    }


    static async getNotifications (token) {
        try {
            let userFromToken = await findUser.findUserID(token);
            const notifications = await prisma.notifications.findMany({
                where: {
                    recipient_id: userFromToken.user.id,
                    read: false,

                }

            });

            return { success: true, data: notifications };
        } catch(error){
            console.log(`error`, error);
            return {success: false, error: error.message};
        }
    }

    static async markNotificationAsRead (token, notificationId) {
        try {
            let userFromToken = await findUser.findUserID(token);
            const notification = await prisma.notifications.update({
                where: {
                    id: Number(notificationId),
                },
                data: {
                    read: true,
                }
            });

            return { success: true, data: notification };
        } catch(error){
            console.log(`error`, error);
            return {success: false, error: error.message};
        }
    }

    static async acceptToTeam (token, notification_id, sender_id) {
        try {
            let userFromToken = await findUser.findUserID(token);

            const teamId = await prisma.notifications.findUnique({
                where: {
                    id: Number(notification_id),
                },
                select: {
                    teamId: true,
                }
            });
          
            const teamOwner = await prisma.createTeam.findUnique({
                where: {
                    id: Number(teamId.teamId),
                },
                select: {
                    user_id: true,
                    id: true,
                    teamName: true,
                }
            });

            const insertIntoAcceptedTeams = await prisma.acceptedTeams.updateMany({
                where: {
                    user_id: sender_id,
                    teamId: Number(teamId.teamId),
                    team_ownerId: teamOwner.user_id,
                },
                data: {
                    accepted: 1,
                }
            });

            const updateNotification = await prisma.notifications.update({
                where: {
                    id: Number(notification_id),
                },
                data: {
                    read: true,
                }
            });

            const insertIntoNotifications = await prisma.notifications.create({
                data: {
                    recipient_id: sender_id,
                    message: `${userFromToken.user.user_metadata.full_name} has accepted your request to join the team ${teamOwner.teamName}`,
                    read: true,
                    teamId: teamId.teamId,
                    sender_id: userFromToken.user.id,
                    type: 'response'
                }
            });

            return { success: true, data: {} };

        }catch(error) {
            console.log(`error`, error);
            return {success: false, error: error.message};
        }
           
    }
}

module.exports = JoinTeamService;