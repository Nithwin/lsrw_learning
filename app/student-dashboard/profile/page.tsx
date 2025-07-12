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
      <div className="flex flex-col items-center w-full px-[1.5rem] gap-10 max-w-[45rem]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-20 w-20 bg-blue-600 rounded-full flex justify-center items-center">
            <p className="text-6xl font-semibold text-white">
              {userDetails?.name[0]}
            </p>
          </div>
          <div>
            <p className="text-2xl text-center font-semibold">
              {userDetails?.name}
            </p>
            <p className="text-lg text-center text-blue-600">
              {userDetails?.role.toUpperCase()[0]}
              {userDetails?.role.substring(1)}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-between w-full">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex flex-col w-full">
              <p className="text-sm">Name</p>
              <input
                className="bg-blue-100 px-4 py-2 rounded text-xl text-gray-600 outline-0 border-2 border-blue-600/10"
                disabled={true}
                type="text"
                value={userDetails?.name}
              />
            </div>
            <div className="flex flex-col w-full">
              <p className="text-sm">Reg No</p>
              <input
                className="bg-blue-100 px-4 py-2 rounded text-xl text-gray-600 outline-0 border-2 border-blue-600/10"
                disabled={true}
                type="text"
                value={userDetails?.regNo}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex flex-col w-full">
              <p className="text-sm">Department</p>
              <input
                className="bg-blue-100 px-4 py-2 rounded text-xl text-gray-600 outline-0 border-2 border-blue-600/10"
                disabled={true}
                type="text"
                value={userDetails?.department}
              />
            </div>
            <div className="flex flex-col w-full">
              <p className="text-sm">Section</p>
              <input
                className="bg-blue-100 px-4 py-2 rounded text-xl text-gray-600 outline-0 border-2 border-blue-600/10"
                disabled={true}
                type="text"
                value={userDetails?.section}
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-sm">Email</p>
            <input
              className="bg-blue-100 px-4 py-2 rounded text-xl text-gray-600 outline-0 border-2 border-blue-600/10"
              disabled={true}
              type="text"
              value={userDetails?.email}
            />
          </div>
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex flex-col w-full">
              <p className="text-sm">Batch</p>
              <input
                className="bg-blue-100 px-4 py-2 rounded text-xl text-gray-600 outline-0 border-2 border-blue-600/10"
                disabled={true}
                type="text"
                value={userDetails?.batch}
              />
            </div>
            <div className="flex flex-col w-full">
              <p className="text-sm">Phone</p>
              <input
                className="bg-blue-100 px-4 py-2 rounded text-xl text-gray-600 outline-0 border-2 border-blue-600/10"
                disabled={true}
                type="text"
                value={userDetails?.phone}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
