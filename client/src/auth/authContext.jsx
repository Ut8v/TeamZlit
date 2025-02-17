import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        const storedUser = sessionStorage.getItem("user");

        if (storedToken && storedUser) {
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

        setUser(fullName);
        setToken(tokenData);
        setLoggedIn(true);

        sessionStorage.setItem("user", JSON.stringify(fullName));
        sessionStorage.setItem("token", JSON.stringify(tokenData));

        return true; 
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setLoggedIn(false);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, user, loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
