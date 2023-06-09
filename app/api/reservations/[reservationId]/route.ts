import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    // Get the current user
    const currentUser = await getCurrentUser();

    // If the current user doesn't exist, return an error response
    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

    // Verify the reservation ID
    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    // Delete the reservation from the database using Prisma
    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } }
            ]
        }
    });

    return NextResponse.json(reservation);
}
