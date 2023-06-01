import './globals.css'
import { Montserrat } from 'next/font/google'
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import {RegisterModal} from "./components/modals/RegisterModal";
import React from "react";
import {ToasterProvider} from "@/app/providers/ToasterProvider";
import {LoginModal} from "@/app/components/modals/LoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";

const font = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Rentopia',
  description: 'Discover a World of Homes Away from Home',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();

    return (
    <html lang="en">
      <body className={font.className}>
      <ClientOnly>
          <ToasterProvider/>
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
