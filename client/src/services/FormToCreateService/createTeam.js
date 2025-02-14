import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export class FormToCreateTeamService {
  static async createTeam(formData) {
    //console.log(formData);
    //console.log(apiUrl);
    try {
      const response = await axios({
        method: 'post',
        //headers: { 'content-type': 'application/json' },
        url: `${apiUrl}/createTeam`,
        data: {
          formData,
        },
      });
      if(response.status === 201){
        try{
          const response = await axios({
            method: 'post',
            url: `${apiUrl}/matchTeamToUser`,
            data: {
              formData,
            },
          });
          if(response.status ==201){
            return { success: true, message: response.data.message, data: response.data };
          }
        } catch (error) {
          if (error.response) {
            return { success: false, message: error.response.data.message };
          } else {
            return { success: false, message: 'Network error. Please try again later.' };
          }
        }
      }else {
        return { success: false, message: response.data.message };
      }
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