"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  Circle,
  CalendarPlus,
  UserPlus,
  ClipboardCheck,
} from "lucide-react";
import CreateEventForm from "./CreateEventForm";
import CompaniesCombobox from "../../CompaniesComboBox";
import { supabase } from "@/app/util/supabase/client";

export default function EventStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    description: "",
    attendees: "",
  });

  const steps = [
    { title: "Create Event", icon: CalendarPlus },
    { title: "Add Attendees", icon: UserPlus },
    { title: "Review", icon: ClipboardCheck },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Event submitted:", eventData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex items-center flex-1 last:flex-none"
          >
            <div className="relative flex flex-col items-center group">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  index <= currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <step.icon className="w-6 h-6" />
                )}
              </div>
              <span className="absolute -bottom-6 text-sm font-medium whitespace-nowrap">
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-[2px] flex-1 mx-2 ${
                  index < currentStep ? "bg-primary" : "bg-muted-foreground"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {currentStep === 0 && (
        <div className="space-y-4">
          <CreateEventForm handleNext={handleNext}></CreateEventForm>
        </div>
      )}

      {currentStep === 1 && (
        <div>
          <CompaniesCombobox getSelectedValue={""}></CompaniesCombobox>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Review Event Details</h3>
          <div className="bg-muted p-4 rounded-md space-y-2">
            <p>
              <span className="font-medium">Name:</span> {eventData.name}
            </p>
            <p>
              <span className="font-medium">Date:</span> {eventData.date}
            </p>
            <p>
              <span className="font-medium">Description:</span>{" "}
              {eventData.description}
            </p>
            <p>
              <span className="font-medium">Attendees:</span>{" "}
              {eventData.attendees}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        {currentStep > 0 && (
          <Button type="button" variant="outline" onClick={handlePrevious}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
}
