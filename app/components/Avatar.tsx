'use client'
import Image from "next/image";
import React from "react";

// Define the interface for AvatarProps
interface AvatarProps {
    src: string | null | undefined;
}

// Define the Avatar component
const Avatar : React.FC<AvatarProps> = ({ src }) => {
    return (
        <Image
            className="rounded-full" // Apply a CSS class for a rounded shape
            alt="Profile picture" // Alternate text for the image
            src={src || "/images/profile-default.png"} // Source URL of the image, or a default image if src is null or undefined
            width="30" // Width of the image
            height="30" // Height of the image
        />

    );
};
export default Avatar;
