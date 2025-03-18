import { useEffect, useState } from "react";
import "../styles/userProfile.css"; 
import GetUserProfile from "@/services/getUserProfile/getUserprofile";
import Loader from "@/components/loading/loader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
    }, []);

    return (
        <div className="user-profile bg-gray-100">
            <div className="profile-container">
                <Avatar className="w-16 h-16">
                    <AvatarImage src={user.profilePic || ""} alt={user.username} />
                    <AvatarFallback>
                        {user.username ? user.username.charAt(0).toUpperCase() : "?"}
                    </AvatarFallback>
                </Avatar>

                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <h2 className="profile-name-user">{user.username}</h2>
                        <p className="profile-info-user"><strong>Email:</strong> {user.email}</p>
                        <p className="profile-info-user"><strong>Bio:</strong> {user.bio ? user.bio : "No bio available"}</p>
                    </>
                )}

                <div className="active-teams">
                    {userTeams.length > 0 ? (
                        <div className="teams-container">
                            <h2 className="active-teams-title"><strong> Active Teams </strong></h2>
                            {userTeams.map((team, index) => (
                                <div key={index} className="team-card" onClick={() => navigate(`/teamPage/${team.id}`)}>
                                    <h3 className="team-name">{team.teamName}</h3>
                                    <p className="team-description">{team.teamDescription}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-teams-message">No active teams</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserPage;
