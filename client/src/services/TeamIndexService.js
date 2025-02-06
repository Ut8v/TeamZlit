import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export class TeamIndexService {
    static async getTeams() {
        try {
            const response = await axios({
                method: 'get',
                url: `${apiUrl}/indexTeam`,
            });

            if(response.status == 200) {
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

    static async getTeamById(teamId) {
        try {
            const response = await axios({
                method: 'get',
                url: `${apiUrl}/indexTeam/getTeamById/${teamId}`,
            });

            if(response.status == 200) {
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