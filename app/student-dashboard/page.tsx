"use client";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebaseConfig";
import { fetchUserDetails, UserDetails } from "@/utils/fetchUserDetails";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const StudentDashboard = () => {
  const { uid, loading } = useAuth();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const loadUserDetails = async ()=>{
      if(uid){
        const details = await fetchUserDetails(uid);
        setUserDetails(details);
      }
    };
    if(!loading && uid){
      loadUserDetails();
    }
  }, [uid, loading]);

  async function handleLogout(){
    try{
      await signOut(auth);
      router.push('/');
    } catch(err){
      console.log("Logout failed ", err);
      
    }
  }

  if (loading) {
    return <div>Loading....</div>;
  }
  return (
  <div>
    <p>{userDetails?.name}</p>
    <button 
    onClick={handleLogout}
    className="bg-red-600 text-white px-[2rem] py-[0.5rem] rounded-xl text-2xl font-semibold cursor-pointer">
      Logout
    </button>
  </div>);
};

export default StudentDashboard;
