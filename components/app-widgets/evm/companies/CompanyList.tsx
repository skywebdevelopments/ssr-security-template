"use client";
import { supabase } from "@/app/util/supabase/client";
import { useEffect, useState } from "react";
import CardContainer from "../../CardContainer";
import { Separator } from "@/components/ui/separator";
function CompanyList() {
  const [CompaniesList, setCompaniesList] = useState([]);
  function getCompanies() {
    supabase
      .from("company")
      .select("*,members(*)")
      .then((data: any) => {
        setCompaniesList(data?.data);
      });
  }
  async function deleteCompany(c: any) {
    const { error } = await supabase.from("company").delete().eq("id", c.id);
    console.log(error);
    
  }
  supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "company" },
      (payload) => {
        getCompanies();
      }
    )
    .subscribe();

  supabase
    .channel("custom-all-channel2")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "members" },
      (payload) => {
        getCompanies();
      }
    )
    .subscribe();

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <CardContainer title="Companies list" subtitle="Companies created by me">
      <ol>
        {CompaniesList &&
          CompaniesList?.length > 0 &&
          CompaniesList?.map((c: any, index: number) => {
            return (
              <li key={index}>
                <div className="flex justify-between align-middle flex-row items-center">
                  <div className="ml-4">
                    <div className="text-md font-medium text-gray-900">
                      {index + 1}- {c.name} - {c?.members?.length} member(s)
                    </div>
                    <div className="text-sm ml-4 text-gray-500">
                      {c.address}
                    </div>
                    {CompaniesList.length !== index + 1 && <Separator />}
                  </div>
                  <div className="">
                    <button
                      onClick={() => {
                        deleteCompany(c);
                      }}
                      className="bg-red-600 hover:bg-red-700 px-2 text-white rounded-lg capitalize"
                    >
                      delete
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
      </ol>
    </CardContainer>
  );
}

export default CompanyList;
