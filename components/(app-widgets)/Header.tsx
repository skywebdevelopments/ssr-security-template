// components/Header.tsx
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Header = ({ network_metadata }:any) => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {/* Toggle Menu Button */}
      {/* Add your Sheet component here for mobile */}
      
      <Breadcrumb className="hidden md:flex">
        {/* Render your breadcrumb items here */}
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" />
      </div>
      <DropdownMenu>
        {/* User Menu */}
      </DropdownMenu>
    </header>
  );
};

export default Header;
