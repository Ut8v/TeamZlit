const { response } = require('express');
const {prisma, Prisma} = require('../database/index');

class FormToCreatePostService {
    static async createPost (data) {
        try{
            const createForPost = await prisma.createPost.create({
                data: {
                  posts: data.formData,               
                },
               })
              return { success: true, data: createForPost };
        } catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                  return {
                    success: false,
                    error: `You already have a post.`,
                  };
                }
              }
            return {success: false, error: error.message};
        }      
    }
}

module.exports = FormToCreatePostService;