import React from 'react'
import { Menu } from 'lucide-react'
import { SidebarProps } from './Sidebar'

type HeaderProps = {
    isOpen:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({isOpen, setOpen}:HeaderProps) => {
  return (
    <header className='w-full bg-primary lg:hidden py-2 px-3'>
        <nav>
                <Menu
                onClick={() => setOpen(true)}
                 className='h-10 w-10 text-white' />
        </nav>
    </header>
  )
}

export default Header