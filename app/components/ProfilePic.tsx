'use client'
import Image from "next/image";

const ProfilePic = () => {
    return (
        <Image
        className="rounded-full"
        alt="Profile picture"
        src="/images/profile-default.png"
        width="30"
        height="30"/>

    );
};
export default ProfilePic;
