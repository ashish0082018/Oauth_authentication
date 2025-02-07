import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";


export const {handlers:{GET,POST},auth,signIn,signOut} =NextAuth({ 
    adapter:PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
          ,


          CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "text" },
              password: { label: "Password", type: "password" },
            },
      
            // It is important to give the authorize function , so that the user who login will validate by some of logic
            // This authorize function accepts the above credentials i.e email and password
            async authorize(credentials: any): Promise<any> {
             
              try {
                // Actully we find the user on basis of username OR email {using $or[] operator of mongoDB} , since dono hi unique h tho koi bhi ek ko bhi le skte ho
                const user = await prisma.user.findUnique({
                    where:{
                        email:credentials.email
                    }
                })
      
                // If user is not registered , so it is directed to the registration
                if (!user) {
                  throw new Error("No user found with this email");
                }
                // user exists in DB but not verified
                //if user is not verified then same again redirect to register/ verification karoo
                // if (!user.isVerified) {
                //   throw new Error("Please verify your account before logging in");
                // }
                // compare the password
                
                const isPasswordCorrect = await bcrypt.compare(
                  credentials.password,
                  user.password || ""
                );
      
                if (isPasswordCorrect) {
                  return user;
                } else {
                  throw new Error("Incorrect password");
                }
              } catch (err: any) {
                throw new Error(err);
              }
            },
          }),

    ],



    
    // callbacks:{
    //     async session({user,session}){
    //         if(session && user){
    //             session.user.id=user.id
    //         }
    //         return session
    //     }
    // }

    session: {
        strategy: "jwt", // "database" hatao agar JWT session chahiye
      },
      callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
            token.email = user.email;
            token.name = user.name;
          }
          return token;
        },
        async session({ session, token }) {
          if (session.user && token) {
            session.user.id = token.id as string;
            session.user.email = token.email as string;
            session.user.name = token.name as string;
          }
          return session;
        }
      },
    
    pages:{
        signIn:"/signin"
    }
})




