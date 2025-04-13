import React from 'react'
import Logo from './Logo';
import { RiCloseLargeFill } from "react-icons/ri";
import Link from 'next/link';
import { headerData } from '../constants/data'
import SocialMedia from './SocialMedia';
import { useOutsideClick } from './hooks/useOutsideClick';
// import { usePathname } from 'next/navigation';
// import { FC } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SidebarProps) => {
  const ref = useOutsideClick<HTMLDivElement>(() => {
    if (isOpen) onClose(); // chỉ gọi khi menu mở
  });

  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 bg-black/50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        ref={ref}
        className="min-w-72 max-w-96 bg-black h-screen p-10 border-r border-shop-light-green flex flex-col gap-6"
      >
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-white" spanDesign="group-hover:text-shop-light-green" />
          <button
            onClick={onClose}
            className="hover:text-shop-light-green hoverEffect"
            title="Close menu"
          >
            <RiCloseLargeFill />
          </button>
        </div>

        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {headerData.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className="hover:text-shop-light-green hoverEffect"
              onClick={onClose}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Optional */}
        <div className="mt-auto pt-10">
          <SocialMedia />
        </div>
      </div>
    </div>
  );
};

export default SideMenu;