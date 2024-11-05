import Dashboard from "@/app/dashboard/page";
import { createIdentity } from "@/app/util/client.keycloak";
import CardContainer from "@/components/app-widgets/CardContainer";
import CompaniesCombobox from "@/components/app-widgets/CompaniesComboBox";
import CreateMemberComponent from "@/components/app-widgets/evm/members/CreateMemberForm";
import { Input } from "@/components/ui/input";

function page() {
  return (
    <Dashboard>
      <div className="flex flex-wrap flex-row">
        <CardContainer
          classes={"  mx-4"}
          title="Secured Identity Management"
          subtitle="create an Identity"
        >
          <CreateMemberComponent />
        </CardContainer>
      </div>
    </Dashboard>
  );
}

export default page;
