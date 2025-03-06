import axios from "@/lib/axios/axios";
class GetFormContent {
    static async getFormContent() {
        try {
            const response = await axios.get('/formContent');
            return response.data;
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async getMyMatches() {
        try {
            const response = await axios.get('/getMyMatchedTeams');
            return response.data;
        } catch (error) {
            return { success: false, error: error.message };
    }
    }

    static async deleteFindTeamForm() {
        try {
            const response = await axios.delete('/formContent');
            return response;
        } catch (error) {
            return { success: false, error: error.message };
        }

    }
}

export default GetFormContent;