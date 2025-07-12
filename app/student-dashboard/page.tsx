"use client";
import { useAuth } from "@/context/AuthContext";
import { fetchUserDetails, UserDetails } from "@/utils/fetchUserDetails";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CircleUserRound } from 'lucide-react';
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



  if (loading) {
    return <div>Loading....</div>;
  }
  return (
  <section className="">
    <div className="">
      <div className="flex justify-between w-full bg-gray-100 px-[1rem] py-2">
        <div >
          <p className="text-xl">Welcome <span className="text-highlight font-semibold">{userDetails?.name}!</span></p>
        </div>
      </div>
    </div>
  </section>
  );
};

export default StudentDashboard;
