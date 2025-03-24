import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GetUserProfile from "@/services/getUserProfile/getUserprofile";
import Loader from "@/components/loading/loader";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const UserPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [userTeams, setUserTeams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const [userProfile, teams] = await Promise.all([
                GetUserProfile.getUserById(id),
                GetUserProfile.getUserTeamsById(id)
            ]);
            setUser(userProfile.data);
            setUserTeams(teams.data);
            setIsLoading(false);
        };
        fetchUserProfile();
    }, [id]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500 p-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full text-center transform hover:scale-105 transition-all duration-300">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-purple-500 shadow-lg">
                                <AvatarImage src={user.profilePic || ""} alt={user.username} className="rounded-full" />
                                <AvatarFallback className="text-xl font-bold text-purple-600">
                                    {user.username ? user.username.charAt(0).toUpperCase() : "?"}
                                </AvatarFallback>
                            </Avatar>
                        </motion.div>

                        <h2 className="text-3xl font-bold text-gray-800 animate-pulse">{user.username}</h2>
                        <p className="text-gray-500 mt-2 italic">{user.email}</p>
                        <p className="text-gray-700 mt-4 bg-gray-100 p-2 rounded-lg">{user.bio || "No bio available"}</p>

                        <div className="mt-6">
                            {userTeams.length > 0 ? (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-100 bg-purple-600 p-2 rounded-lg shadow-md">Active Teams</h3>
                                    <div className="space-y-3 mt-4">
                                        {userTeams.map((team, index) => (
                                            <motion.div 
                                                key={index} 
                                                className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-purple-100 transition-all duration-300 transform hover:scale-105 border border-purple-300"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => navigate(`/teamPage/${team.id}`)}>
                                                <h3 className="text-md font-semibold text-purple-700">{team.teamName}</h3>
                                                <p className="text-gray-600 text-sm">{team.teamDescription}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-200 bg-purple-500 p-2 rounded-lg shadow-md">No active teams</p>
                            )}
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default UserPage;
