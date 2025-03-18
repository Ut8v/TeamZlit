import { useEffect, useState } from "react";
import "../styles/userProfile.css"; 
import GetUserProfile from "@/services/getUserProfile/getUserprofile";
import { useToast } from "@/hooks/use-toast"
import Loader from "@/components/loading/loader";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [editedUser, setEditedUser] = useState({
        bio: "",
    });
    const [userTeams, setUserTeams] = useState([]);
    const { toast } = useToast();
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

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
    },[refresh]);

    const [isEditing, setIsEditing] = useState(false);


    const handleSave = async() => {
        const updateBio = await GetUserProfile.updateUserProfile(editedUser);

        if (updateBio.status === 204){
            toast({
                title: "Profile updated successfully",
                description: "Your profile has been updated.",
                variant: "success",
            });
            setIsEditing(false);
            setRefresh(!refresh);
        }else{
            toast({
                title: "Error updating profile",
                description: updateBio.error,
                variant: "destructive",
            });
        }
    };
    const handleChange = (e) => {
        const { value } = e.target;
        setEditedUser({bio: value });
    }

    return (
     <div className="user-profile bg-gray-100">
        <div className="profile-container">
        <Avatar className="w-16 h-16">
                    <AvatarImage src={user.profilePic || ""} alt={user.username} />
                    <AvatarFallback>
                        {user.username ? user.username.charAt(0).toUpperCase() : "?"}
                    </AvatarFallback>
                </Avatar>
            
            {isEditing ? (
                <>
                   <h2 className="profile-name-user">{user.username}</h2>
                   <p className="profile-info-user"><strong>Email:</strong> {user.email}</p>
                    <textarea
                        name="bio"
                        placeholder="Bio"
                        value={editedUser.bio}
                        onChange={handleChange}
                        className="profile-input"
                    />
                </>
            ) : (
                <>
                  {isLoading ? 
                    <Loader /> :
                    <>
                    <h2 className="profile-name-user">{user.username}</h2>
                    <p className="profile-info-user"><strong>Email:</strong> {user.email}</p>
                    <p className="profile-info-user"><strong>Bio:</strong> {user.bio ? user.bio : ''}</p>
                    </>
                  }
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

            {isEditing ? (
                <button className="save-btn" onClick={handleSave}>Save</button>
            ) : (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
            )}
        </div>
        </div>
    );
};

export default UserProfile;