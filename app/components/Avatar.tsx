'use client'
import Image from "next/image";
import React from "react";

interface AvatarProps {
    src: string | null | undefined;
}
const Avatar : React.FC<AvatarProps> = ({ src }) => {
    return (
        <Image
        className="rounded-full"
        alt="Profile picture"
        src={src || "/images/profile-default.png"}
        width="30"
        height="30"/>

    );
};
export default Avatar;
