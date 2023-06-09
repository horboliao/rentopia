import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

// Function for retrieving listings based on the provided parameters
export default async function getListings(
    params: IListingsParams
) {
    try {
        const {
            userId,
            roomCount,
            guestCount,
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category,
        } = params;

        let query: any = {};

        // Add userId to the query if provided
        if (userId) {
            query.userId = userId;
        }

        // Add category to the query if provided
        if (category) {
            query.category = category;
        }

        // Add roomCount to the query if provided
        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        // Add guestCount to the query if provided
        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        // Add bathroomCount to the query if provided
        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        // Add locationValue to the query if provided
        if (locationValue) {
            query.locationValue = locationValue;
        }

        // Add date range condition to the query if both startDate and endDate are provided
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        // Retrieve listings from the database using Prisma
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Format the createdAt field to ISO string for each listing
        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}
