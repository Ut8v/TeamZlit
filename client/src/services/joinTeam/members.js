import axios from "@/lib/axios/axios";

class MembersService {
    static async findMembers(id) {
        try {
            const response = await axios.get(`/members`, {
                params: {
                  teamId: id
                }
              });

            if(response.status === 200) {
                return {
                    success: true,
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
export default MembersService;
