import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image";
import { useAppSelector } from "@/src/store/useSelecterhook"
import Link from "next/link";

export function AppSidebar() {
    const userData = useAppSelector((state) => state.userData.profileData);

    const prifileImgId = userData?.userProfile?.profileImgUrl;
    const showProfileImg = prifileImgId
    ? 
    prifileImgId
    :
    "/img/defaultProfile.JFIF";

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex  items-center">
            <div>
                <Image
                src={showProfileImg}
                width={70}
                height={70}
                alt="your Profile img"
                className="p-3 rounded-full"
                />
            </div>
            <h1 className="font-bold pt-3 text-gray-700">{userData?.userProfile?.profileName}</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="bg-gray-700 py-3 px-2 hover:bg-gray-600 my-1">Dashboard</SidebarMenuItem>

            <Link href={'/createPost'}><SidebarMenuItem className="bg-gray-700 py-3 px-2 hover:bg-gray-600 my-1">Create Post</SidebarMenuItem></Link>
            
            <SidebarMenuItem className="bg-gray-700 py-3 px-2 my-1 hover:bg-gray-600 cursor-pointer">Users</SidebarMenuItem>
            <SidebarMenuItem className="bg-gray-700 py-3 px-2 hover:bg-gray-600 my-1 cursor-pointer">Settings</SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter>
        <p className="text-sm">© 2026</p>
      </SidebarFooter>
    </Sidebar>
  )
}