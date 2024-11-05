"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/app/util/supabase/client";

export default function CompaniesCombobox({
  getSelectedValue,
  classnames,
}: {
  getSelectedValue: any;
  classnames?: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [companiesList, setCompaniesList] = React.useState([]);

  function returnCompany(c: any) {
    getSelectedValue(c);
  }

  function getCompanies() {
    supabase
      .from("company")
      .select("*")
      .then((response: any) => {
        setCompaniesList(response.data);
      });
  }

  React.useEffect(() => {
    getCompanies();
  }, []);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`w-full justify-between ${classnames}`}
          >
            {value ? value : "Select a company..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search company..." />
            <CommandList>
              <CommandEmpty>No data found.</CommandEmpty>
              <CommandGroup>
                {companiesList &&
                  companiesList?.map((c: any) => (
                    <CommandItem
                      key={c.name}
                      value={c}
                      onSelect={(currentValue: any) => {
                        setValue(currentValue.id === c.id ? "" : currentValue);
                        setOpen(false);
                        returnCompany(c.id);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === c.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {c.name}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
