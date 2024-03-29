'use client'

import Container from "@/app/components/Container";
import React from "react";
import Logo from "@/app/components/navbar/Logo";
import Search from "@/app/components/navbar/Search";
import UserMenu from "@/app/components/navbar/UserMenu";
import {SafeUser} from "@/app/types";
import Categories from "@/app/components/navbar/Categories";

interface NavbarProps {
    currentUser?: SafeUser | null;
}
//navigation panel with logo, search filter and profile icon
const Navbar: React.FC<NavbarProps> = ({currentUser}) => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="
                    flex
                    flex-row
                    items-center
                    justify-between
                    gap-4
                    md:gap-0"
                    >
                        <Logo/>
                        <Search/>
                        <UserMenu currentUser={currentUser}/>
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    );
};
export default Navbar;
