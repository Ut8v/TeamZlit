const findUser = require('../user/index');
const {prisma, Prisma} = require('../../database/index');
class userList {
    static async getUserList(token) {
        try {
            let userFromToken = await findUser.findUserID(token);
            const users = await prisma.users.findMany({
                where: {
                    user_id: {
                        not: userFromToken.user.id
                    }
                }
            });

            const formattedUsers = users.map(user => ({
                ...user,
                id: user.id.toString() // Convert BigInt to string
            }));
        
            return {
                success: true,
                data: formattedUsers
            };
        } catch(error) {
            console.log(error, `error getting user list`);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = userList;