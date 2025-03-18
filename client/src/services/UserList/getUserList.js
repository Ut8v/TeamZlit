import axios from "@/lib/axios/axios";
const apiUrl = import.meta.env.VITE_API_URL;
class UserList {
    static async getUserList() {
        try {
            const response = await axios({
                method: 'get',
                url: `${apiUrl}/userList`,
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

    static async getUserById(userId) {
        try {
            const response = await axios({
                method: 'get',
                url: `${apiUrl}/userList/getUserById/${userId}`,
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

export default UserList;