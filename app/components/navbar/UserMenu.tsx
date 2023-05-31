'use client'
import React from "react";
import {AiOutlineMenu} from "react-icons/all";
import ProfilePic from "@/app/components/ProfilePic";
import {useState,useCallback} from "react";
import MenuItem from "@/app/components/navbar/MenuItem";
import {useRegisterModal} from "@/app/hooks/useRegisterModal";
import {useLoginModal} from "@/app/hooks/useLoginModal";
import {User} from "@prisma/client";
import {signOut} from "next-auth/react";


interface UserMenuProps {
    currentUser?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({
                                               currentUser
                                           }) => {
    const registerModal = useRegisterModal();
    const loginModel = useLoginModal();

    const [isOpen, setIsOpen] = useState(false);
    // const [currentUser, setCurrentUser] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="flex flex-row gap-3 items-center">
            <div className="
            text-sm font-semibold
            rounded-full
            py-2
            px-4
            shadow-sm
            hover:bg-neutral-100
            hover:shadow-md
            transition
            duration-500
            cursor-pointer
            hidden
            md:block"
            >Rent out accommodation</div>
            <div className="
            rounded-full
            py-1
            px-1
            cursor-pointer
            flex
            flex-row
            items-center
            border-[1px]
            hover:shadow-md
            "
            onClick={toggleOpen}>
                <div className="px-2 ">
                    <AiOutlineMenu size={18}/>
                </div>
                <div className="hidden md:block">
                    <ProfilePic/>
                </div>
            </div>
            {isOpen && (
                <div
                    className="
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-1/5
                    bg-white
                    overflow-hidden
                    xl:right-20
                    md:right-10
                    sm:right-4
                    right-2
                    top-14
                    text-sm
                  "
                >
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    label="My trips"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="My favorites"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="My reservations"
                                    onClick={() =>{}}
                                />
                                <MenuItem
                                    label="My properties"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="Airbnb your home"
                                    onClick={() => {}}
                                />
                                <hr />
                                <MenuItem
                                    label="Logout"
                                    onClick={() => signOut()}
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    label="Login"
                                    onClick={loginModel.onOpen}
                                />
                                <MenuItem
                                    label="Sign up"
                                    onClick={registerModal.onOpen}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
export default UserMenu;
