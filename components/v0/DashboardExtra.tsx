"use client";
import { EventsAccordion } from "./EventsAccordion";
import { CompanyMemberTreeView } from "./CompanyMemberTreeView";
import { MemberTransferView } from "./MemberTransferView";
import { TotalTicketsMetric } from "./stats/TotalTicketsMetrics";

export default function DashboardExtra() {
  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TotalTicketsMetric />

        {/* Add other metric cards here if needed */}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CompanyMemberTreeView />
        <MemberTransferView />
      </div>
      <EventsAccordion />
    </div>
  );
}
