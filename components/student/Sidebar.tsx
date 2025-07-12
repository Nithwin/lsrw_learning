import Image from "next/image";
import Link from "next/link";
import React, { forwardRef } from "react";
import { LayoutDashboard, User } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import { LogOut } from "lucide-react";
import { UserRoundSearch } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";
export type SidebarProps = {
  isOpen: boolean;
};
const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ isOpen }, ref) => {
  const router = useRouter();

  async function handleLogout() {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.log("Logout failed ", err);
    }
  }

  return (
    <aside
      ref={ref}
      className={` ${
        isOpen ? "" : "hidden"
      } lg:block bg-primary w-2/3 lg:w-auto fixed top-0 bottom-0 left-0`}
    >
      <div className="p-2 lg:px-3 flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center gap-[2rem]">
          <div className="flex items-center">
            <Image
              src={"/assets/icons/logo.png"}
              alt="Logo"
              height={50}
              width={50}
              className=""
            />
            <p className="text-2xl text-white font-semibold lg:hidden">
              Grammoro
            </p>
          </div>
          <ul className="flex flex-col gap-[2rem]">
            <li>
              <Link
                href={"/student-dashboard/"}
                className="flex gap-2 items-center lg:flex-col lg:gap-1"
              >
                <LayoutDashboard className="text-white" />
                <p className="text-white lg:text-sm">Dashboard</p>
              </Link>
            </li>
            <li>
              <Link
                href={"/student-dashboard/exam"}
                className="flex gap-2 items-center lg:flex-col lg:gap-1"
              >
                <BookOpenCheck className="text-white" />
                <p className="text-white lg:text-sm">Exam</p>
              </Link>
            </li>
            <li>
              <Link
                href={"/student-dashboard/profile"}
                className="flex gap-2 items-center lg:flex-col lg:gap-1"
              >
                <User className="text-white" />
                <p className="text-white lg:text-sm">Profile</p>
              </Link>
            </li>
            <li>
              <Link
                href={"/student-dashboard/faculty"}
                className="flex gap-2 items-center lg:flex-col lg:gap-1"
              >
                <UserRoundSearch className="text-white" />
                <p className="text-white lg:text-sm">Faculty</p>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-[1.5rem] lg:px-[0.7rem] py-[0.5rem] rounded-lg text-white text-xl font-semibold flex gap-3 lg:gap-2 items-center cursor-pointer"
          >
            <LogOut className="h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
});
export default Sidebar;
