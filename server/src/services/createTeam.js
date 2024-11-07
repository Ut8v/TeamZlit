const { response } = require('express');

const {prisma, Prisma} = require('../database/index');
class FormToCreateTeamService {

    static async createTeam (data) {
        try{
           console.log(data);
            const createForTeam = await prisma.createTeam.create({
                data: {
                  username: data.formData.email,
                  email: data.formData.email,
                  teamName: data.formData.teamName,
                  teamDescription: data.formData.teamDescription,
                  teamType: data.formData.teamType,
                  rolesRequiredId: 1,
                  skills: data.formData.skills, 
                  visibility: data.formData.visibility,
                  additionalNotes: data.formData.additionalNotes,
                },
              })
              return { success: true, data: createForTeam };
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
            return {success: false, error: error.message};
        }
       
    }
}

module.exports = FormToCreateTeamService;