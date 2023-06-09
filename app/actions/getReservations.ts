import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

/**
 * Retrieves reservations from the database.
 *
 * @param params - The parameters for filtering reservations.
 * @returns An array of safe reservations.
 * @throws If an error occurs during the retrieval process.
 */
export default async function getReservations(params: IParams) {
    try {
        const { listingId, userId, authorId } = params;

        const query: any = {};

        // Filter by listing ID
        if (listingId) {
            query.listingId = listingId;
        }

        // Filter by user ID
        if (userId) {
            query.userId = userId;
        }

        // Filter by author ID
        if (authorId) {
            query.listing = { userId: authorId };
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Map reservations to safe reservations
        const safeReservations = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString()
            }
        }));

        return safeReservations;
    } catch (error: any) {
        throw new Error(error);
    }
}
