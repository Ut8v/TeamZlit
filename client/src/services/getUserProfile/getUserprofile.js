import axios from "@/lib/axios/axios";
class GetUserProfile{
    static getUserProfile = async () => {
        try {
            const response = await axios.get('/userProfile');
            return response.data;
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static updateUserProfile = async (data) => {
        try {
            const response = await axios.put('/userProfile', data);
            return response;
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static getUserTeams = async () => {
        try {
            const response = await axios.get('/userTeams');
            return response.data;
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static getUserById = async (userId) => {
        try {
            const response = await axios.get(`/userList/getUserById/${userId}`);
            return response.data;
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static getUserTeamsById = async (userId) => {
        try {
            const response = await axios.get(`/userTeams/getUserTeamsById/${userId}`);
            return response.data;
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}
export default GetUserProfile;