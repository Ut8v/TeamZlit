import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export class PostIndexService {
    static async getPosts() {
        try {
            const response = await axios({
                method: 'get',
                url: `${apiUrl}/indexPost`,
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

    static async getPostById(postId) {
        try {
            const response = await axios({
                method: 'get',
                url: `${apiUrl}/indexPost/getPostById/${postId}`,
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

    static async deletePost(postId) {
        try {
            const response = await axios({
                method: 'delete',
                url: `${apiUrl}/indexPost/deletePost/${postId}`,
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

