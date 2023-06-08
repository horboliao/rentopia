import { getServerSession } from "next-auth/next"

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions); // Retrieve the server session using the provided authOptions
}

export default async function getCurrentUser() {
    try {
        const session = await getSession(); // Retrieve the current session

        if (!session?.user?.email) {
            return null; // If the email is not available in the session, return null
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string, // Find the user with the matching email in the database
            }
        });

        if (!currentUser) {
            return null; // If the user is not found, return null
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(), // Convert the createdAt timestamp to an ISO string
            updatedAt: currentUser.updatedAt.toISOString(), // Convert the updatedAt timestamp to an ISO string
            emailVerified: currentUser.emailVerified?.toISOString() || null, // Convert the emailVerified timestamp to an ISO string or set it to null if not available
        };
    } catch (error: any) {
        return null;
    }
}
