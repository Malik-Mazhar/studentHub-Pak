'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '../store/useSelecterhook';
import { logout } from '../store/userDataSlice';
import { signOut } from 'next-auth/react';

function Navbar() {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.userData.isAuthenticated)

    const handleLogOut = async () => {
      setLoading(true);
      dispatch(logout()); // optional (UI instant update)
      await signOut({ callbackUrl: "/sign-in" });
    };

  return (
    <div className='w-screen text-end'>
        {isAuthenticated ?
        <>
          <Button onClick={handleLogOut} className='hover:cursor-pointer py-2 px-4 m-5'>{loading ? "Loading..." : "LogOut"}</Button>
          <Link href='/profile' className='hover:cursor-pointer py-2 px-4 m-5'>Go to profile</Link>
        </>
      :
          <Link href="/sign-in">
            <Button>SignIn</Button>
          </Link>
        }
      
    </div>
  )
}

export default Navbar
