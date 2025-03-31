import axios from "@/lib/axios/axios";
import { FormToCreatePostService } from "../../services/FormToCreatePostService/createPost"

export class FormToFindTeamService {
  static async findTeam(formData) {
    try {
      if(formData.makePost == true){    
              const postResult = await FormToCreatePostService.createPost(formData);
      
              if (!postResult.success) {
                return { success: false, message: postResult.message };
              }
            }

      const response = await axios({
        method: 'post',
        url: `/findTeam`,
        data: {
          formData,
        },
      });

      if(response.status === 201){
        try{
          const response = await axios({
            method: 'post',
            url: `/matchTheUser`,
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
        return { success: false, message: error.response.data.message };
      } else {
        return { success: false, message: 'Network error. Please try again later.' };
      }
    }
  }

  static async activeFormCheck() {
    try {
      const response = await axios.get('/activeFormCheck');

      return response;
    }catch(error){
      if(error.response){
        return { success: false, message: error.response.data.message };
      }
    }

  }

}