"use client";
import { AlignLeft } from 'lucide-react'
import React from 'react'
import SideMenu from './SideMenu'
const MobileMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <>
      <button type="button" title="Toggle Sidebar" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <AlignLeft
          className="hover:text-darkColor hoverEffect md:hidden
                hover:cursor-pointer "
        />
      </button>
      <div className="md:hidden">
        <SideMenu
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </>
  );
}

export default MobileMenu