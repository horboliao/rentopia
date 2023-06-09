import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import {useLoginModal} from "./useLoginModal";
import React from "react";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const router = useRouter();

    // Retrieve the login modal from the useLoginModal hook
    const loginModal = useLoginModal();

    // Determine if the listing is already in the user's favorites
    const hasFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    // Toggle the favorite status of the listing
    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();

            // If the user is not logged in, open the login modal
            if (!currentUser) {
                return loginModal.onOpen();
            }

            try {
                let request;

                // Determine the API request based on the current favorite status
                if (hasFavorite) {
                    request = () => axios.delete(`/api/favorites/${listingId}`);
                } else {
                    request = () => axios.post(`/api/favorites/${listingId}`);
                }

                // Make the API request
                await request();
                // Refresh the page to update the favorite status
                router.refresh();
                toast.success('Success');
            } catch (error) {
                toast.error('Something went wrong.');
            }
        },
        [
            currentUser,
            hasFavorite,
            listingId,
            loginModal,
            router
        ]);

    return {
        hasFavorite,
        toggleFavorite,
    }
}

export default useFavorite;
