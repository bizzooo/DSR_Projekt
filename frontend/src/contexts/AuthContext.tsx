import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
     const storedUser = sessionStorage.getItem('user');
     if (storedUser) {
         setUser(JSON.parse(storedUser));
     }
 }, []);

 const login = (user: User) => {
     setUser(user);
     sessionStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
 };

 const logout = () => {
     setUser(null);
     sessionStorage.removeItem('user'); // Remove user data from localStorage
 };
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};