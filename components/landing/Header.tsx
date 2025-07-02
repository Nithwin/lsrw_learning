"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [isNavigationBarOpen, setNavigationBarOpen] = useState(false);

  return (
    <header className='w-full py-[0.5rem] pt-[1rem] px-[0.5rem] bg-white/20 backdrop-blur-3xl lg:px-[2rem] xl:px-[4rem] fixed top-0  z-50 '>
      <nav className='flex items-center justify-between w-full'>
        <div className='flex items-center '>
          <Image
            src="/assets/icons/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="h-15"
            priority
          />
          <p className='text-3xl font-bold'>Grammoro</p>
        </div>

        <div className='lg:hidden'>
          {isNavigationBarOpen ? (
            <X onClick={() => setNavigationBarOpen(!isNavigationBarOpen)} className='size-10' />
          ) : (
            <Menu onClick={() => setNavigationBarOpen(!isNavigationBarOpen)} className='size-10' />
          )}
        </div>
        <div className='hidden lg:flex'>
          <ul className='flex justify-between gap-[3rem] items-center'>
            <li>
              <a href="#home" className='text-lg'>Home</a>
            </li>
            <li>
              <a href="#features" className='text-lg'>Features</a>
            </li>
            <li>
              <a href="#about" className='text-lg'>About</a>
            </li>
            <li>
              <a href="#contact" className='text-lg'>Contact</a>
            </li>
            <li>
              <Link href="/student-login" className='bg-primary px-[1.5rem] py-[0.5rem] rounded-[1.8rem] text-white font-medium border-2 border-primary hover:bg-white hover:text-primary transition-all delay-100 ease-in-out'>
                Login
              </Link>
            </li>
          </ul>
        </div>
        <div className={`${isNavigationBarOpen ? 'translate-y-0' : 'translate-y-200'} lg:hidden transition-transform ease-in delay-150 z-50 fixed  top-[4rem] bottom-0 right-0 left-0 flex justify-center `}>
          <ul className='flex flex-col items-center justify-evenly py-[2rem] pb-[4rem] h-svh bg-gray-200/80  backdrop-blur-2xl w-full'>
            <li>
              <a href="#home" onClick={() => setNavigationBarOpen(false)} className='text-xl font-medium'>Home</a>
            </li>
            <li>
              <a href="#features" onClick={() => setNavigationBarOpen(false)} className='text-xl font-medium'>Features</a>
            </li>
            <li>
              <a href="#about" onClick={() => setNavigationBarOpen(false)} className='text-xl font-medium'>About</a>
            </li>
            <li>
              <a href="#contact" onClick={() => setNavigationBarOpen(false)} className='text-xl font-medium'>Contact</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;