'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { IUser } from "@repo/types/lib/schema/user"; // Adjust the path if necessary
import { authService } from "../services/authServices"; // Corrected import path // Ensure this file exists

interface UserContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  loading: boolean; // Add a loading state
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Start loading
      try {
        const fetchedUser = await authService.getCurrentUser();
        setUser(fetchedUser);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        //  setUser(null);  //removed setting user to null.
      } finally {
        setLoading(false); // Stop loading, regardless of success or failure
      }
    };

    fetchUser();
  }, []);

  const contextValue = { user, setUser, loading }; // Include loading in the context

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
