import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}
// Handler function for the POST method
export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    // Check if a current user exists
    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    // Validate the listingId parameter
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    // Add the listingId to the favoriteIds array of the current user
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    // Update the favoriteIds of the current user in the database
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    // Return the updated user object as a JSON response
    return NextResponse.json(user);
}

// Handler function for the DELETE method
export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    // Check if a current user exists
    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    // Validate the listingId parameter
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    // Remove the listingId from the favoriteIds array of the current user
    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    // Update the favoriteIds of the current user in the database
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    // Return the updated user object as a JSON response
    return NextResponse.json(user);
}
