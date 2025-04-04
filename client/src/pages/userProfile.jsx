import { useEffect, useState } from "react";
import GetUserProfile from "@/services/getUserProfile/getUserprofile";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/loading/loader";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [editedUser, setEditedUser] = useState({ bio: "" });
    const [userTeams, setUserTeams] = useState([]);
    const { toast } = useToast();
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const [userProfile, teams] = await Promise.all([
                GetUserProfile.getUserProfile(),
                GetUserProfile.getUserTeams()
            ]);
            setUser(userProfile.data);
            setUserTeams(teams.data);
            setIsLoading(false);
        };
        fetchUserProfile();
    }, [refresh]);

    const handleSave = async () => {
        const updateBio = await GetUserProfile.updateUserProfile(editedUser);

        if (updateBio.status === 204) {
            toast({
                title: "Profile updated successfully",
                description: "Your profile has been updated.",
                variant: "success",
            });
            setIsEditing(false);
            setRefresh(!refresh);
        } else {
            toast({
                title: "Error updating profile",
                description: updateBio.error,
                variant: "destructive",
            });
        }
    };

    const handleChange = (e) => {
        setEditedUser({ bio: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-[#0f3445] border-[#0f3445] shadow-2xl">
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

                            {isEditing ? (
                                <Input
                                    as="textarea"
                                    className="bg-[#0f3445] text-white border-white/30 focus:border-white/60 placeholder-white/50 min-h-[100px]"
                                    placeholder="Write something about yourself..."
                                    name="bio"
                                    value={editedUser.bio}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className="text-white/80 bg-white/10 p-3 rounded-lg">
                                    {user.bio || "No bio available."}
                                </p>
                            )}

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

                            <div className="flex justify-center space-x-4">
                                {isEditing ? (
                                    <Button 
                                        onClick={handleSave}
                                        className="w-full bg-[#008780] hover:bg-white/90 transition-colors duration-300"
                                    >
                                        Save
                                    </Button>
                                ) : (
                                    <Button 
                                        onClick={() => setIsEditing(true)}
                                        className="w-full bg-[#008780] hover:bg-[#3fb182] transition-colors duration-300"
                                    >
                                        Edit Profile
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default UserProfile;