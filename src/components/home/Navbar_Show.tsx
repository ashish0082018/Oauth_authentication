"use client";
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from 'next/link';

function NavbarShow() {
  const session = useSession();


  let authContent: React.ReactNode;

  if (session.status === "loading") return null; // Nothing will reflect during the data fetching of the user

  if (session.data?.user) {
    authContent = (
      <Popover>
        <PopoverTrigger asChild>
          
          <Avatar>
          
            <AvatarImage src={session.data.user.image || undefined } />
            <AvatarFallback> CN </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <h2>{session.data.user.name}</h2>
          <Button onClick={()=>signOut()} >Logout</Button>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <div className='flex gap-5 justify-center items-center'>
        <Link href={"/signin"}><Button>Sign in</Button></Link>
        <Link href={"/signup"}><Button className='bg-blue-600'>Sign up</Button></Link>
      </div>
    );
  }

  return authContent; // Ensure this is inside the function and properly returned after the logic
}

export default NavbarShow;
