"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

function BreadCrumb() {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList >
          {pathNames.map((link, index) => {
            return (
              <>
                <BreadcrumbItem key={`${link}-${index}`}>
                  <BreadcrumbPage  className="capitalize">
                    {link}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                  {pathNames.length !== index + 1 && (
                    <BreadcrumbSeparator  />
                  )}
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default BreadCrumb;
