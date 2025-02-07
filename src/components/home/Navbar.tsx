"use client"
import React from 'react'
import Link from 'next/link'
import NavbarShow from './Navbar_Show'
import { useSession } from 'next-auth/react'

function Navbar() {
  const session=useSession()
  return (
    <div className='h-full flex justify-between mx-5 sm:mx-10 text-zinc-100'>
   
      <div className='tracking-tighter font-semibold text-xl flex justify-center items-center'>
        <Link href={"/"}>ProfileX</Link>
      </div>
      
      <div className='hidden sm:flex gap-7 justify-center items-center'>
      <Link href={""}>About</Link>
      <Link href={""}>Contact</Link>
{
  session.data && <><Link href={"/dashboard"}>Create</Link>
             <Link href={""}>Your profiles</Link> </>
}
      </div>

      <div className='flex gap-5 justify-center items-center'>
        <NavbarShow />
      </div>
      
    </div>
  )
}

export default Navbar
