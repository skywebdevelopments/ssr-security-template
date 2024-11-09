"use client";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import CardContainer from "../../CardContainer";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/app/util/supabase/client";
import { useState } from "react";
import { Alert } from "@/components/ui/alert";
type FormValues = {
  title: string;
  description: string;
  start_at: string;
  end_at: string;
};
function CreateEventForm({ handleNext }: { handleNext?: any }) {
  const [SubmitResponse, setSubmitResponse] = useState<SupabaseResponse>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setSubmitResponse({ data: null, isLoading: true, result: 0 });
    const { data: createdRow, error } = await supabase
      .from("events")
      .insert(data)
      .select();

    if (createdRow) {
      setSubmitResponse({ data: createdRow, isLoading: false, result: 200 });
      handleNext();
    }
    error && setSubmitResponse({ data: error, isLoading: false, result: 1000 });
  };

  return (
    <div>
      {!SubmitResponse?.isLoading && SubmitResponse?.result === 200 ? (
        <Alert variant={"default"}>
          <p className="text-green-600">Event created successfully</p>
        </Alert>
      ) : SubmitResponse?.result === 1000 ? (
        <Alert variant={"destructive"}>
          <p className="text-red-600">{"Event already exists"}</p>
        </Alert>
      ) : null}
      <form className="flex-col flex gap-4 " onSubmit={handleSubmit(onSubmit)}>
        <Label>Title</Label>
        <Input
          {...register("title", { required: true })}
          className={`${errors.title ? "border-red-500" : ""}`}
          type={"text"}
          placeholder="Aa"
        />
        <Label>Description</Label>
        <Input
          {...register("description", { required: true })}
          className={`${errors.description ? "border-red-500" : ""}`}
          type={"text"}
          placeholder="Aa"
        />
        <Label>Start At</Label>
        <Input
          {...register("start_at", { required: true })}
          className={`${errors.start_at ? "border-red-500" : ""}`}
          type={"datetime-local"}
          placeholder="Event Start"
        />
        <Label>End At</Label>
        <Input
          {...register("end_at", { required: true })}
          className={`${errors.end_at ? "border-red-500" : ""}`}
          type={"datetime-local"}
          placeholder="Event End"
        />
        <Button
          type="submit"
          className="bg-green-700 hover:bg-green-600 text-white rounded-md"
        >
          {SubmitResponse?.isLoading ? "Loading..." : "Create Event"}
        </Button>
      </form>
    </div>
  );
}

export default CreateEventForm;
