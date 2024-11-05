import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { isSessionAlive, RetrieveServerSession } from "../util/client.keycloak";
import BreadCrumb from "@/components/app-widgets/BreadCrumb";

export default async function Page({ children }: { children: any }) {
  await isSessionAlive();
  const serverSession = await RetrieveServerSession();

  
  return (
    <SidebarProvider>
      <AppSidebar user={serverSession.user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* <BreadCrumb /> */}
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
