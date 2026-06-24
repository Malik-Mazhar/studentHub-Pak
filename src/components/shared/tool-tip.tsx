import { SidebarTrigger } from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
   
   function toolTip() {
      const { open } = useSidebar()
     return (
      <div className="p-2 bg-gray-800">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger className="bg-gray-200 hover:bg-gray-300 size-8 cursor-pointer"/>
            </TooltipTrigger>

            <TooltipContent>
                {open ? "Close Sidebar" : "Open Sidebar"}
            </TooltipContent>

          </Tooltip>
        </TooltipProvider>
       
      </div>
     )
   }
   
   export default toolTip
   