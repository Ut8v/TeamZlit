const {prisma, Prisma} = require("../../database/index");
class ActiveFormCheck {
    static async checkActiveForm(userId) {
        try {
            const activeForm = await prisma.lookingForTeam.findFirst({
                where: {
                    user_id: userId,
                }
            });

            if (activeForm) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(`error`, error);
            return { success: false, error: err.message };
        }
    }

    static async getFormContent(userId) {
        try {
            const activeForm = await prisma.lookingForTeam.findFirst({
                where: {
                    user_id: userId,
                }
            });
            return { success: true, data: activeForm };
        } catch (error) {
            console.log(`error`, error);
            return { success: false, error: err.message };
        }
    }

    static async deleteFormContent(userId, email) {
        try {
            const activeForm = await prisma.lookingForTeam.delete({
                where: {
                    user_id: userId,
                    email: email,
                }
            });

            const matched = await prisma.userMatchedTeams.deleteMany({
                where: {
                    user_id: userId,
                }
            });
            return { success: true, data: activeForm };
        } catch (error) {
            console.log(`error`, error);
            return { success: false, error: error.message };
        }

    }
}
module.exports = ActiveFormCheck;