'use client' 
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Tooltip from "@/src/components/shared/tool-tip" 
// import { AppSidebar } from "../../components/shared/app-user-sidebar" 
import AppSidebar from "@/src/components/shared/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
     return (
         <SidebarProvider> 
            <div className="flex min-h-screen w-full">
                 <AppSidebar />
                  {/* <Tooltip /> */}
                  
                <main className="flex-1 "> 
                    {children} 
                </main> 
            </div> 
        </SidebarProvider>
    )
}