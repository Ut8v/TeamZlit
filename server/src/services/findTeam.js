const { response } = require('express');

const {prisma, Prisma} = require('../database/index');
class FormToFindTeamService {

    static async findTeam (data, userId) {
        try{
            const lookingForTeam = await prisma.lookingForTeam.create({
                data: {
                  username: data.formData.email,
                  email: data.formData.email,
                  skills: data.formData.skills, 
                  role: data.formData.role,
                  experienceLevel: data.formData.experienceLevel,
                  availability: data.formData.availability,
                  interestAreas: data.formData.interestAreas,
                  portfolio: data.formData.portfolio,
                  preferredTeamType: data.formData.preferredTeamType,
                  additionalNotes: data.formData.additionalNotes,
                  user_id: userId,
                },
              })
              return { success: true, data: lookingForTeam };
        } catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                //prisma throws this error code when email already exists; handling like this for now 
                //this should not be a issue in the future
                if (error.code === 'P2002') {
                  return {
                    success: false,
                    error: `You already have active form flled out.`,
                  };
                }
              }
            return {success: false, error: err.message};
        }
       
    }

    static async activeFormCheck(userId) {
        try{
            const activeForm = await prisma.lookingForTeam.findFirst({
                where: {
                    user_id: userId,
                }
            });
            console.log(`activeForm`, activeForm);
            if(activeForm){
                return true;
            }else{
                return false;
            }
        }catch(error){
            console.log(`error`, error);
            return {success: false, error: err.message};
        }
    }
}

module.exports = FormToFindTeamService;