"use client";
import Header from "@/components/student/Header";
import Sidebar, { SidebarProps } from "@/components/student/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function StudentDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { uid, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !uid) {
      router.push("/student-login");
    }
  }, [uid, loading, router]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Move the loading check here, after all hooks
  if (loading || !uid) return <div>Loading...</div>;

  return (
    <section className="flex flex-col lg:ps-[7rem] relative">
      <Header isOpen={isOpen} setOpen={setOpen} />
      <Sidebar ref={sidebarRef} isOpen={isOpen} />
      {children}
    </section>
  );
}
