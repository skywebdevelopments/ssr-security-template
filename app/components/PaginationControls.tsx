// components/PaginationControls.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

const PaginationControls = () => {
  return (
    <Pagination className="ml-auto mr-0 w-auto">
      <PaginationContent>
        <PaginationItem>
          <Button size="icon" variant="outline" className="h-6 w-6">
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="sr-only">Previous Order</span>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button size="icon" variant="outline" className="h-6 w-6">
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="sr-only">Next Order</span>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
