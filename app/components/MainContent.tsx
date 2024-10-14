// components/MainContent.tsx

import { DashboardStatsCharts } from "./DashboardStatsCharts";
import NetworkCard from "./NetworkCard";


const MainContent = ({ network_metadata, session }:any) => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <DashboardStatsCharts session={session} />
      </div>
      <div>
        <NetworkCard network_metadata={network_metadata} />
      </div>
    </main>
  );
};

export default MainContent;
