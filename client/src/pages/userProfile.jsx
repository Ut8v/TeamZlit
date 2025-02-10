import { useState } from "react";
import "../styles/userProfile.css"; 

const UserProfile = () => {
    const [user, setUser] = useState({
        profilePic: "https://via.placeholder.com/150", 
        firstName: "Utshav",
        lastName: "Khatiwada",
        email: "test@gmail.com",
        bio: "Software Developer ",
        teams: ["Team Alpha", "Team Beta"],
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSave = () => {
        setUser(editedUser);
        setIsEditing(false);
    };

    return (
     <div className="user-profile bg-gray-100">
        <div className="profile-container">
            <img src={user.profilePic} alt="Profile" className="profile-pic" />
            
            {isEditing ? (
                <>
                    <input
                        type="text"
                        name="firstName"
                        value={editedUser.firstName}
                        onChange={handleChange}
                        className="profile-input"
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={editedUser.lastName}
                        onChange={handleChange}
                        className="profile-input"
                    />
                    <input
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleChange}
                        className="profile-input"
                    />
                    <textarea
                        name="bio"
                        value={editedUser.bio}
                        onChange={handleChange}
                        className="profile-input"
                    />
                    <input
                        type="text"
                        name="teams"
                        value={editedUser.teams.join(", ")}
                        onChange={(e) =>
                            setEditedUser({ ...editedUser, teams: e.target.value.split(", ") })
                        }
                        className="profile-input"
                    />
                </>
            ) : (
                <>
                    <h2 className="profile-name-user">{user.firstName} {user.lastName}</h2>
                    <p className="profile-info-user"><strong>Email:</strong> {user.email}</p>
                    <p className="profile-info-user"><strong>Bio:</strong> {user.bio}</p>
                    <p className="profile-info-user">
                        <strong>Teams:</strong> {user.teams.length > 0 ? user.teams.join(", ") : "No Teams"}
                    </p>
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