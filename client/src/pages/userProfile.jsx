import { useEffect, useState } from "react";
import "../styles/userProfile.css"; 
import GetUserProfile from "@/services/getUserProfile/getUserprofile";
import userProfileIcon from "../assets/user-profile-icon.jpg";
import { useToast } from "@/hooks/use-toast"
const UserProfile = () => {
    const [user, setUser] = useState({});
    const [editedUser, setEditedUser] = useState({
        bio: "",
    });
    const { toast } = useToast();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userProfile = await GetUserProfile.getUserProfile();
            setUser(userProfile.data);
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
            <img src={userProfileIcon} alt="Profile" className="profile-pic" />
            
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
                    <h2 className="profile-name-user">{user.username}</h2>
                    <p className="profile-info-user"><strong>Email:</strong> {user.email}</p>
                    <p className="profile-info-user"><strong>Bio:</strong> {user.bio ? user.bio : ''}</p>
                </>
            )}

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