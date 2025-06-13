import { createContext, useState, useEffect } from "react";

export let userContext = createContext();

export default function UserContextProvider(props) {
  // Initialize state from role-specific tokens (adminToken or userToken)
  const [token, setToken] = useState(() => {
    try {
      // Check for role-specific tokens that your login component sets
      return localStorage.getItem('adminToken') || localStorage.getItem('userToken') || null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  });

  // DON'T manage localStorage here - let the login component handle it
  // This prevents duplication and conflicts
  
  return (
    <userContext.Provider value={{ token, setToken }}>
      {props.children}
    </userContext.Provider>
  );
}