const { response } = require('express');

const {prisma, Prisma} = require('../database/index');
class FormToFindTeamService {

    static async findTeam (data) {
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
}

module.exports = FormToFindTeamService;