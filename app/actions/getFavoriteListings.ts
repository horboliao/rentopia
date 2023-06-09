import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

// Function to fetch the user's favorite listings
export default async function getFavoriteListings() {
    try {
        // Get the current user
        const currentUser = await getCurrentUser();

        // If no user is logged in, return an empty array
        if (!currentUser) {
            return [];
        }

        // Retrieve the favorite listings from the database
        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        });

        // Convert the favorites to a safe format
        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toString(),
        }));

        // Return the safe favorites
        return safeFavorites;
    } catch (error: any) {
        // Throw an error if something goes wrong
        throw new Error(error);
    }
}
