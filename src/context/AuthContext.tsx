import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { checkAuthStatus, loginUser, signupUser, logoutUser } from "../helpers/api-communicator";


type User = {
    name: string;
    email: string;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        //mod added for homepage auth-status failure
        console.log("Document cookies: ", document.cookie);
        if (!document.cookie.includes("your_cookie_name")) { 
            console.log("No auth cookie found, skipping auth check.");
            return;
        }
        // fectch if user's cookies are still valid then skip login
            async function checkStatus() {
                try {
                    const data = await checkAuthStatus();
                    console.log("Auth check dat:", data);
                    if (data) {
                        setUser({ email: data.email, name: data.name});
                        setIsLoggedIn(true);
                    }
                 } catch (error) {
                console.error("Auth check failed", error);
            }
        }   
        checkStatus();
    }, [] );

        const login = async (email: string, password: string) => {
            try {
                const data = await loginUser(email, password);
                console.log("Login data:", data);
                if (data) {
                    setUser({ email: data.email, name: data.name});
                    setIsLoggedIn(true);
                    }
                } catch (error) {                               // try-catch error added later
                    console.error("Login failed: ", error);
                    throw error;
                }
        };

        //const signup = async (name: string, email: string, password: string) => {};
        const signup = async (name: string, email: string, password: string) => {
            try {
                const data = await signupUser(name, email, password);
                console.log("Signup data: ", data);
                if (data) {
                    setUser({ email: data.email, name: data.name });
                    setIsLoggedIn(true);
                }
               
            } catch (error) {
                console.error("Signup failed:", error);
                throw error;
            }
        };
        
        const logout = async () => {
            try {
                await logoutUser();
                setUser(null);
                setIsLoggedIn(false);
                window.location.reload();
                
            } catch (error) {
                console.error("Logout failed: ", error);
            }
        };

        const value = {
            user,
            isLoggedIn,
            login,
            logout,
            signup,
        };
        return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
