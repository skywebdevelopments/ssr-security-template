"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitCompany } from "@/app/actions/company/ActionCompany";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert } from "@/components/ui/alert";
import CardContainer from "../../CardContainer";
type FormValues = {
  name: string;
  email: string;
  address: string;
};
function CreateCompanyComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [SubmitResponse, setSubmitResponse] = useState<SupabaseResponse>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setSubmitResponse({ isLoading: true });
    SubmitCompany(data)
      .then((data) => {
        console.log(data);

        setSubmitResponse({ isLoading: false, ...data });
      })
      .catch((error) => {
        setSubmitResponse({ isLoading: false, ...error });
      });
  };

  return (
    <>
    
      <CardContainer classes={''} title="My Companies" subtitle="create a company">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className=" flex flex-col gap-4 mx-3"
        >
          {!SubmitResponse?.isLoading && SubmitResponse?.result === 200 ? (
            <Alert variant={"default"}>
              <p className="text-green-600">Company created successfully</p>
            </Alert>
          ) : SubmitResponse?.result === 1000 ? (
            <Alert variant={"destructive"}>
              <p className="text-red-600">{"Company already exists"}</p>
            </Alert>
          ) : null}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" />
          </div>
          <Input
            type="text"
            placeholder="Company Name"
            {...register("name", { required: true })}
            className={`${errors.name ? "border-red-500" : ""}`}
          />
          <Input
            {...register("email", { required: true })}
            type="text"
            placeholder="Company Email"
            className={`${errors.email ? "border-red-500" : ""}`}
          />
          <Textarea
            placeholder="Company Address"
            {...register("address", { required: true })}
            className={`${errors.address ? "border-red-500 " : ""}`}
          />
          <Button type="submit" className="bg-green-800 hover:bg-green-700">
            {SubmitResponse?.isLoading ? "Loading..." : "Create Company"}
          </Button>
        </form>
      </CardContainer>
    </>
  );
}

export default CreateCompanyComponent;
