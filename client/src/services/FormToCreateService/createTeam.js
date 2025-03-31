import axios from "@/lib/axios/axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { FormToCreatePostService } from "../../services/FormToCreatePostService/createPost"

export class FormToCreateTeamService {
  static async createTeam(formData) {
    try {
      if(formData.makePost == true){
        const postResult = await FormToCreatePostService.createPost(formData);

        if (!postResult.success) {
          return { success: false, message: postResult.message };
        }
      }

      const response = await axios({
        method: 'post',
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
          console.log(error, 'error');
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
        console.log(error, `error2`);
        console.log(error.response, 'error.response');
        return { success: false, message: error.response.data.message };
      } else {
        return { success: false, message: 'Network error. Please try again later.' };
      }
    }
  }
}