"use client";
import React from 'react'
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from 'next/navigation';
// import path from 'path';

const HeaderMenu = () => {
    const pathname=usePathname();
    return (
        <div className='hidden md:inline-flex w-1/3 items-center gap-7 text-sm capitalize 
    font-normal text-lightColor'>
            {headerData?.map((item) => (
                <Link key={item?.title} href={item?.href}
                    className={`hover:text-shop-light-green hoverEffect relative group
                    ${pathname === item?.href && "text-shop_light_green" }`}>
                    {item?.title}
                    {/* underline effect */}
                    <span
                        className={`absolute bottom-0 left-1/2 h-0.5 w-0 bg-shop-light-green 
                        transition-all duration-300 group-hover:left-0 group-hover:w-1/2
                        ${pathname === item?.href && "w-1/2"}`}
                    />
                    <span
                        className={`absolute bottom-0 right-1/2 h-0.5 w-0 bg-shop-light-green 
                        transition-all duration-300 group-hover:right-0 group-hover:w-1/2
                        ${pathname === item?.href && "w-1/2"}`}
                    />
                </Link>
            ))}
        </div>
    )
}

export default HeaderMenu