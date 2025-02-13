const createClient = require('@supabase/supabase-js').createClient;
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY; 

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = data; 
        next(); 
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        res.status(500).json({ message: "Internal Server Error", error: "Something went wrong please try again" });
    }
};

module.exports = authenticateUser;