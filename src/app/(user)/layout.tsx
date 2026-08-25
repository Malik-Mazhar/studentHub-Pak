'use client' 
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Tooltip from "@/src/components/shared/tool-tip" 
// import { AppSidebar } from "../../components/shared/app-user-sidebar" 
import AppSidebar from "@/src/components/shared/app-sidebar"
import AppHeader from "@/src/components/shared/app-header"

export default function Layout({ children }: { children: React.ReactNode }) {
     return (
         <SidebarProvider> 
            <div className="flex min-h-screen w-full">
                <div className="fixed top-0 left-0 w-full z-50">
                    <AppHeader />
                </div>
                 <AppSidebar />
                  {/* <Tooltip /> */}
                  
                <main className="flex-1 "> 
                    {children} 
                </main> 
            </div> 
        </SidebarProvider>
    )
}