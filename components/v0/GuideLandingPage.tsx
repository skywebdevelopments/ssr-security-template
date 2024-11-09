"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AssignMembersStepper } from "./AssignMembersStepper";
import { CreateCompanyAndAddMembers } from "./CreateCompanyAndAddMembers";
import { MemberForm } from "./MemberForm";
import { CompanyForm } from "./CompanyForm";
import { EventForm } from "./EventForm";
import {
  Users,
  Building2,
  UserPlus,
  CalendarPlus,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

type Operation = {
  title: string;
  description: string;
  icon: LucideIcon;
  component: React.ComponentType;
};

const operations: Operation[] = [
  {
    title: "Assign Members",
    description: "Assign members to companies",
    icon: Users,
    component: AssignMembersStepper,
  },
  {
    title: "Create Company & Add Members",
    description: "Create a new company and add members",
    icon: Building2,
    component: CreateCompanyAndAddMembers,
  },
  {
    title: "Add Member",
    description: "Add a new member",
    icon: UserPlus,
    component: MemberForm,
  },
  {
    title: "Create Company",
    description: "Create a new company",
    icon: Building2,
    component: CompanyForm,
  },
  {
    title: "Create Event",
    description: "Create a new event",
    icon: CalendarPlus,
    component: EventForm,
  },
];

export default function GuideLandingPage() {
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(
    null
  );

  return (
    <div className="min-h-screen p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Company Management Guide</h1>
        <p className="text-xl text-gray-600">
          Select an operation to get started
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {operations.map((operation, index) => (
          <motion.div
            key={operation.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <operation.icon className="mr-2 h-6 w-6" />
                  {operation.title}
                </CardTitle>
                <CardDescription>{operation.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {/* Add any additional content here if needed */}
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full"
                      onClick={() => setSelectedOperation(operation)}
                    >
                      Start
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white ">
                    <DialogHeader>
                      <DialogTitle>{selectedOperation?.title}</DialogTitle>
                      <DialogDescription>
                        {selectedOperation?.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      {selectedOperation && <selectedOperation.component />}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
