"use client"
import AppHeader from "../components/shared/app-header";
import { useAppSelector } from "../store/useSelecterhook";
import LandingPage from '../components/sections/Lending'
import HomePage from "../components/sections/Home"
import { useSession } from "next-auth/react";

export default function Home() {
  
  const isAuthenticated = useAppSelector(satate => satate.userData.isAuthenticated);
  const { data: session, status } = useSession();
  console.log("session...", isAuthenticated)

  return (
    <div className="relative min-h-screen">

      <div className="fixed top-0 left-0 w-full z-50">
        <AppHeader />
      </div>

        {/* Main Layout */}

      {isAuthenticated ? 
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
