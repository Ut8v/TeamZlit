const { response } = require('express');
const {prisma, Prisma} = require('../database/index');
const findUser = require('./user/index');

class GetUserProfile {
    static getUserProfile = async (token) => {
        let userFromToken = await findUser.findUserID(token);
        try {
            const userInfo = await prisma.users.findFirst({
                where: {
                    user_id: userFromToken.user.id,
                    email: userFromToken.user.email,
                },
                select: {
                    email: true,
                    username: true,
                    bio: true,
                }
            });
            console.log(`user info`, userInfo); //server logs
            return { success: true, data: userInfo };
        } catch (error) {
            console.error("Error fetching user profile:", error);
            return { success: false, error: error.message };
        }
    }

    static updateUserProfile = async (token, data) => {
        let userFromToken = await findUser.findUserID(token);
        try {
            const userInfo = await prisma.users.update({
                where: {
                    user_id: userFromToken.user.id,
                    email: userFromToken.user.email,
                },
                data: {
                    bio: data.bio,
                }
            });
            return { success: true, data: userInfo };
        } catch (error) {
            console.error("Error updating user profile:", error);
            return { success: false, error: error.message };
        }
    }

}
module.exports = GetUserProfile;