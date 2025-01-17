import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Fetches the list of teams from the server.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const browseTeams = async () => {
    try {
      const response = await axios.get(`${apiUrl}/teams`);
      return {
        success: true,
        data: response.data, // Array of teams
      };
    } catch (error) {
      console.error('Error fetching teams:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };