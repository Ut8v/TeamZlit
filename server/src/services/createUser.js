const { response } = require('express');

const {prisma, Prisma} = require('../database/index');
class FormToCreateUserService {

    static async createUser (data) {
        try{
           console.log(data);
            const createForUser = await prisma.users.create({
                data: {
                  username: data.formData.username,
                  email: data.formData.email,
                  password: data.formData.password,               
                },
              })
              return { success: true, data: createForUser };
        } catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                //prisma throws this error code when email already exists; handling like this for now 
                //this should not be a issue in the future
                if (error.code === 'P2002') {
                  return {
                    success: false,
                    error: `You already have an account.`,
                  };
                }
              }
            return {success: false, error: error.message};
        }
       
    }
}

module.exports = FormToCreateUserService;