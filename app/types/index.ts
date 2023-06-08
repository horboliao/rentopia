import { Listing, Reservation, User } from "@prisma/client";

// Represents a user object with certain fields omitted and modified
export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

// Represents a listing object with the "createdAt" field modified
export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string;
};

// Represents a reservation object with certain fields omitted and modified,
// and the "listing" field of type SafeListing
export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
};
