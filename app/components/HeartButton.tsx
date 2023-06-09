'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";

interface HeartButtonProps {
    listingId: string
    currentUser?: SafeUser | null
}

// HeartButton component to display a heart icon for favoriting a listing
const HeartButton: React.FC<HeartButtonProps> = ({
                                                     listingId,
                                                     currentUser
                                                 }) => {
    const { hasFavorite, toggleFavorite } = useFavorite({
        listingId,
        currentUser
    });

    return (
        <div
            onClick={toggleFavorite}
            className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
        >
            <AiOutlineHeart
                size={28}
                className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
            />
            <AiFillHeart
                size={24}
                className={
                    hasFavorite ? 'fill-[#1DB954]' : 'fill-neutral-500/70'
                }
            />
        </div>
    );
}

export default HeartButton;
