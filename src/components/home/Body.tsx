"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import { Button } from '../ui/button';

function Body() {
  const session=useSession();

  return (
    <div>

      {
        session.data? <>Welcome {session.data?.user?.name}  </>: <>Home page </>
      }
      
    </div>
  )
}

export default Body