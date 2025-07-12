"use client";
import { useAuth } from "@/context/AuthContext";
import { fetchUserDetails, UserDetails } from "@/utils/fetchUserDetails";
import { CircleUserRound } from "lucide-react";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const { uid, loading } = useAuth();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  useEffect(() => {
    async function fetchStudentDetails() {
      if (uid) {
        const details = await fetchUserDetails(uid);
        setUserDetails(details);
      }
    }
    if (uid && !loading) {
      fetchStudentDetails();
    }
  }, [uid, loading]);
  return (
    <section className="py-[2rem] flex justify-center">
      <div className="flex flex-col items-center w-full px-[1.5rem] gap-10 max-w-[30rem]">
        <div className="h-20 w-20 bg-gray-900 rounded-full">
          <CircleUserRound className="h-full w-full text-white" />
        </div>
        <div className="flex flex-col gap-2 justify-between w-full">
          <div className="flex justify-between w-full border-b-1 pb-2">
            <p>Name</p>
            <p>{userDetails?.name}</p>
          </div>
          <div className="flex justify-between w-full border-b-1 pb-2">
            <p>Reg No</p>
            <p>{userDetails?.regNo}</p>
          </div>
          <div className="flex justify-between w-full border-b-1 pb-2">
            <p>Batch</p>
            <p>{userDetails?.batch}</p>
          </div>
          <div className="flex justify-between w-full border-b-1 pb-2">
            <p>Department</p>
            <p>{userDetails?.department}</p>
          </div>
          <div className="flex justify-between w-full border-b-1 pb-2">
            <p>Section</p>
            <p>{userDetails?.section}</p>
          </div>
          <div className="flex justify-between w-full border-b-1 pb-2">
            <p>Email</p>
            <p>{userDetails?.email}</p>
          </div>
          <div className="flex justify-between w-full border-b-1 pb-2">
            <p>Phone</p>
            <p>{userDetails?.phone}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
