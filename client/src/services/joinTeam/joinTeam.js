import axios from "@/lib/axios/axios";

class JoinTeamService {
    static async joinTeam(teamId) {
        try {
            const response = await axios({
                method: 'post',
                url: `/joinTeam`,
                data: {
                    teamId: teamId
                }
            });

            if(response.status == 201) {
                return { 
                    success: true, 
                    message: response.data.message, 
                    data: response.data
                };
            } else {
                return { 
                    success: false, 
                    message: response.data.message 
                };
            }
        } catch (error) {
            if (error.response) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: 'Network error. Please try again later.' };
            }
        }
    }
}

export default JoinTeamService;