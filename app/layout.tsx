import './globals.css'
import { Montserrat } from 'next/font/google'
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import {RegisterModal} from "./components/modals/RegisterModal";
import React from "react";
import {ToasterProvider} from "@/app/providers/ToasterProvider";
import {LoginModal} from "@/app/components/modals/LoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import RentModal from "@/app/components/modals/RentModal";
import SearchModal from "@/app/components/modals/SearchModal";
// Define the Montserrat font with the 'latin' subset
const font = Montserrat({ subsets: ['latin'] })

// Metadata for the layout
export const metadata = {
    title: 'Rentopia',
    description: 'Discover a World of Homes Away from Home',
}

// RootLayout component
export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    // Retrieve the current user asynchronously
    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
        <body className={font.className}>
        <ClientOnly>
            <ToasterProvider/>
            <SearchModal/>
            <RentModal/>
            <LoginModal/>
            <RegisterModal/>
            <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className="pb-20 pt-28">
            {children}
        </div>
        </body>
        </html>
    )
}
