"use client";
import React, { useState } from "react";
import { Section } from "@/components/landing/Section";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { log } from "console";
import { FirebaseError } from "firebase/app";

const StudentLogin: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try{
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/student-dashboard');
    } catch(err){
      const error = err as FirebaseError;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section className="bg-primary min-h-svh">
      <div className="flex flex-col justify-center items-center gap-2 lg:flex-row-reverse lg:gap-0">
        <div className="h-[18rem] w-[20rem] lg:h-[30rem] overflow-hidden rounded-xl lg:w-1/2 relative">
          <Image
            src="/assets/images/studentlogin.jpg"
            alt="Student Login"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex w-full px-[1rem] lg:h-[30rem] lg:w-1/2 ">
          <div className="bg-white rounded-xl w-full justify-center px-[1rem] py-[2rem] flex flex-col gap-5 lg:px-[3rem]">
            <p className="text-4xl text-center font-semibold">Login</p>
            {error && <p className="text-red-500 text-center py-2">{error}</p>}
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm lg:text-lg">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-1 rounded-lg px-[1rem] py-[0.5rem] lg:text-lg"
                  placeholder="example@gmail.com"
                  required
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm lg:text-lg">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-1 rounded-lg px-[1rem] py-[0.5rem] lg:text-lg"
                  placeholder="Password"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-[1.5rem] text-lg font-semibold lg:text-xl text-white"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default StudentLogin;