import Candidets from "@/components/(app-widgets)/Candidets";
import SessionManagement from  "@/components/(app-widgets)/SessionManagement";

function page() {
  return (
    <div>
      <SessionManagement>
        <Candidets />
      </SessionManagement>
    </div>
  );
}

export default page;
