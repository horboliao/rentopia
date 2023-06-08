import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"


import prisma from "@/app/libs/prismadb"


// Define the authentication options
export const authOptions: AuthOptions = {
    // Use PrismaAdapter for session management
    adapter: PrismaAdapter(prisma),
    providers: [
        // GitHub provider configuration
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        // Google provider configuration
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        // Credentials provider configuration
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            // Custom authorization logic for the credentials provider
            async authorize(credentials) {
                // Check if credentials are valid
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                // Find the user in the database based on email
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // Check if user exists and has a hashed password
                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                // Compare the provided password with the hashed password
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                // Check if the password is correct
                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }

                // Return the user object if authentication is successful
                return user;
            }
        })
    ],
    pages: {
        signIn: '/',
    },
    // Enable debugging in development mode
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt",
    },
    // Secret for signing cookies and tokens
    secret: process.env.NEXTAUTH_SECRET,
}

// Export the NextAuth instance with the configured options
export default NextAuth(authOptions);
