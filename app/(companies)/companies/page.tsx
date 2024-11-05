import Dashboard from "@/app/dashboard/page";
import CreateCompanyForm from "@/components/app-widgets/evm/companies/CreateCompanyForm";
import CompanyList from "@/components/app-widgets/evm/companies/CompanyList";
function page() {
  return (
    <>
      <Dashboard>
        <div className="flex  items-start p-4 justify-start flex-row gap-3">
          <div className="w-6/12">
          <CreateCompanyForm />
          </div>
          <div className=" w-6/12">
          <CompanyList />
          </div>
        </div>
      </Dashboard>
    </>
  );
}

export default page;
