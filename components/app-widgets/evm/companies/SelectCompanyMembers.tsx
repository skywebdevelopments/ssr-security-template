"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/app/util/supabase/client";

export interface Member {
  id: number;
  name: string;
  uuid: string;
  title: string;
  mobile: string;
  address: string;
  imageurl: any;
  birthdate: string;
  company_id: number;
  identity_id: any;
}

export interface Company {
  id: number;
  name: string;
  email: string;
  image: any;
  enabled: boolean;
  uuid: string;
  address: string;
  creator: string;
  members: Member[];
}

interface TreeItemProps {
  item: Company | Member;
  level: number;
  onSelect: (item: Company | Member, isSelected: boolean) => void;
  isSelected: boolean;
  selectedItems: Set<string>;
}

const TreeItem: React.FC<TreeItemProps> = ({
  item,
  level,
  onSelect,
  isSelected,
  selectedItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCompany = "members" in item;

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (checked: boolean) => {
    onSelect(item, checked);
  };

  return (
    <div className="select-none">
      <div
        className={`flex items-center space-x-2 py-1 px-2 hover:bg-accent rounded-md cursor-pointer`}
        style={{ paddingLeft: `${level * 20}px` }}
      >
        {isCompany && (
          <span onClick={handleToggle} className="cursor-pointer">
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </span>
        )}
        <Checkbox
          checked={isSelected}
          onCheckedChange={handleSelect}
          id={`item-${item.uuid}`}
        />
        <label
          htmlFor={`item-${item.uuid}`}
          className="flex-grow cursor-pointer"
        >
          {item.name}
        </label>
      </div>
      {isCompany && isOpen && (
        <div>
          {(item as Company).members.map((member) => (
            <TreeItem
              key={member.uuid}
              item={member}
              level={level + 1}
              onSelect={onSelect}
              isSelected={selectedItems.has(member.uuid)}
              selectedItems={selectedItems}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface CompanyTreeViewProps {
  companies: Company[];
}

export default function CompanyTreeView() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [companies, setCompanies] = useState<Company[]>();
  useEffect(() => {
    supabase
      .from("company")
      .select("*,members(*)")
      .then((res: any) => {
        setCompanies(res.data);
      });
  });
  const handleSelect = (item: Company | Member, isSelected: boolean) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(item.uuid);
        if ("members" in item) {
          item.members.forEach((member) => newSet.add(member.uuid));
        }
      } else {
        newSet.delete(item.uuid);
        if ("members" in item) {
          item.members.forEach((member) => newSet.delete(member.uuid));
        }
      }
      return newSet;
    });
  };

  const getSelectedItems = (): (Company | Member)[] => {
    const items: (Company | Member)[] = [];
    companies?.forEach((company: Company) => {
      if (selectedItems.has(company.uuid)) {
        items.push(company);
      } else {
        company?.members?.forEach((member) => {
          if (selectedItems.has(member.uuid)) {
            items.push(member);
          }
        });
      }
    });
    return items;
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <ScrollArea className="h-[400px] border rounded-md p-4">
        {companies?.map((company: Company) => (
          <TreeItem
            key={company.uuid}
            item={company}
            level={0}
            onSelect={handleSelect}
            isSelected={selectedItems.has(company.uuid)}
            selectedItems={selectedItems}
          />
        ))}
      </ScrollArea>
      <div>
        <h3 className="font-semibold mb-2">Selected Items:</h3>
        <ul className="list-disc pl-5">
          {getSelectedItems().map((item) => (
            <li key={item.uuid}>
              {item.name} ({item.uuid})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
