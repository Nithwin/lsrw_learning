"use client";

import { auth } from "@/lib/firebaseConfig";
import { fetchUserDetails, UserDetails } from "@/utils/fetchUserDetails";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";


interface AuthContextType {
    uid: string | null;
    loading: boolean;
    userDetails: UserDetails | null;
}

const AuthContext = createContext<AuthContextType>({
    uid:null,
    loading:true,
    userDetails:null,
});

export const AuthProvider = ({children}:{children:React.ReactNode}) =>{

    const [uid, setUid] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUid(user?.uid || null);
            if(uid){
                const details = await fetchUserDetails(uid);
                setUserDetails(details);
            }
            setLoading(false);
        })
        return () => unsubscribe();
    },[]);

    return (
        <AuthContext.Provider value={{uid, loading, userDetails}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
