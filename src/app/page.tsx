"use client"
import AppHeader from "../components/shared/app-header";
import { useAppSelector } from "../store/useSelecterhook";
import LandingPage from '../components/sections/Lending'
import HomePage from "../components/sections/Home"
import { useSession } from "next-auth/react";

export default function Home() {
  
  const isAuthenticated = useAppSelector(satate => satate.userData.isAuthenticated);
  const { data: session, status } = useSession();

  if (status === "loading") {
  return <p>Loading...</p>;
  }


  const isLoggedIn = Boolean(session?.user?.email || session?.user?._id);

  return (
    <div className="relative min-h-screen">

      <div className="fixed top-0 left-0 w-full z-50">
        <AppHeader />
      </div>

        {/* Main Layout */}

      {isLoggedIn ? 
          <div className="flex">
            <HomePage />
          </div>
          :
          <div>
            <LandingPage />
          </div>
      }

      
    </div>
  );
}
