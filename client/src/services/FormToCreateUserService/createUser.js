import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export class FormToCreateUserService {
  static async createUser(formData) {
    try {
      const response = await axios({
        method: 'post',
        url: `${apiUrl}/createUser`,
        data: {
          formData,
        },
      });
      return { success: true, message: response.data.message, data: response.data };
    } catch (error) {
      if (error.response) {
        console.log(error.response, 'error.response');
        return { success: false, message: error.response.data.message };
      } else {
        return { success: false, message: 'Network error. Please try again later.' };
      }
    }
  }
}