import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GetUserProfile from "@/services/getUserProfile/getUserprofile";
import Loader from "@/components/loading/loader";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-[#2e5669] border-[#0f3445] shadow-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-white">User Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div className="space-y-6">
                            <Avatar className="w-24 h-24 mx-auto mb-4">
                                <AvatarImage src={user.profilePic || ""} alt={user.username} />
                                <AvatarFallback className="text-xl font-bold text-white">
                                    {user.username ? user.username.charAt(0).toUpperCase() : "?"}
                                </AvatarFallback>
                            </Avatar>

                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-white">{user.username}</h2>
                                <p className="text-white/80 mt-1">{user.email}</p>
                            </div>

                            <p className="text-white/80 bg-white/10 p-3 rounded-lg">
                                {user.bio || "No bio available"}
                            </p>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">Active Teams</h3>
                                {userTeams.length > 0 ? (
                                    <div className="space-y-3">
                                        {userTeams.map((team) => (
                                            <div 
                                                key={team.id} 
                                                className="p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
                                                onClick={() => navigate(`/teamPage/${team.id}`)}
                                            >
                                                <h4 className="text-white font-semibold">{team.teamName}</h4>
                                                <p className="text-white/70 text-sm">{team.teamDescription}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-white/80 bg-white/10 p-3 rounded-lg">No active teams</p>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default UserPage;