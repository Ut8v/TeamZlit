import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        const storedUser = sessionStorage.getItem("user");
        const storedUserEmail = sessionStorage.getItem("userEmail");

        if (storedToken && storedUser && storedUserEmail) {
            setUserEmail(storedUserEmail.toString().replace(/"/g, ""));
            setToken(storedToken);
            setUser(storedUser.toString().replace(/"/g, "")); 

            setLoggedIn(true);
        }
    }, []);

    const login = async (userData) => {
        if (!userData || !userData.user) {
            return false;
        }

        const fullName = userData.user.user_metadata.full_name;
        const tokenData = userData.session.access_token; 
        const emailData = userData.user.user_metadata.email;

        setUserEmail(emailData);
        setUser(fullName);
        setToken(tokenData);
        setLoggedIn(true);

        sessionStorage.setItem("user", JSON.stringify(fullName));
        sessionStorage.setItem("token", JSON.stringify(tokenData));
        sessionStorage.setItem("userEmail", JSON.stringify(emailData));

        return true; 
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setLoggedIn(false);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userEmail");
    };

    return (
        <AuthContext.Provider value={{ token, user, userEmail, loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
