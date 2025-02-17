const createClient = require('@supabase/supabase-js').createClient;
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY; 

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

class findUser {
    static async findUserID(token){
        const processedToken = token.split(" ")[1];
        const { data, error } = await supabase.auth.getUser(processedToken);
        if (error) {
            return null;
        }
        return data;
    }
}
module.exports = findUser;