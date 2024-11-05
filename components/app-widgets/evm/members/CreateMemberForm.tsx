"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitCompany } from "@/app/actions/company/ActionCompany";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert } from "@/components/ui/alert";
import CardContainer from "../../CardContainer";
import { TrendingUp } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import CompaniesCombobox from "../../CompaniesComboBox";
import { supabase } from "@/app/util/supabase/client";
type FormValues = {
  firstname: string;
  birthdate: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  company_id: string;
  mobile: string;
};
function CreateMemberComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [SubmitResponse, setSubmitResponse] = useState<SupabaseResponse>();

  async function handleSelectedCompany(c: any) {
    register("company_id", { value: c });
  }

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    setSubmitResponse({ isLoading: true });
    console.log(formData);

    const { data, error }: any = await supabase
      .from("members")
      .insert({
        name: formData.firstname,
        title: "MR",
        company_id: formData.company_id,
        address: formData.lastname,
        birthdate: formData.birthdate,
        mobile: formData.mobile,
      })
      .select();

    setSubmitResponse({ isLoading: false, result: 200 });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className=" flex flex-col gap-4 mx-3"
      >
        {!SubmitResponse?.isLoading && SubmitResponse?.result === 200 ? (
          <Alert variant={"default"}>
            <p className="text-green-600">Identity created successfully</p>
          </Alert>
        ) : SubmitResponse?.result === 1000 ? (
          <Alert variant={"destructive"}>
            <p className="text-red-600">{"Identity already exists"}</p>
          </Alert>
        ) : null}

        {/* form */}
        <CompaniesCombobox
          classnames={errors.company_id ? "border-red-500" : ""}
          getSelectedValue={handleSelectedCompany}
        />

        <div className="flex flex-row justify-between gap-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="fname">First Name</Label>
            <Input
              className={`${errors.firstname ? "border-red-500" : ""}`}
              {...register("firstname", { required: true })}
              id="fname"
              type="text"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="lname">Last Name</Label>
            <Input
              className={`${errors.lastname ? "border-red-500" : ""}`}
              {...register("lastname", { required: true })}
              id="lname"
              type="text"
            />
          </div>
        </div>
        <Input
          {...register("username", { required: true })}
          type="text"
          placeholder="Company Name"
          className={`${errors.username ? "border-red-500" : ""}`}
        />
        <Input
          {...register("email", { required: true })}
          type="text"
          placeholder="Member Email"
          className={`${errors.email ? "border-red-500" : ""}`}
        />

        <Input
          {...register("password", { required: true })}
          type="password"
          placeholder="password"
          className={`${errors.password ? "border-red-500" : ""}`}
        />
        <Input
          {...register("mobile", { required: true })}
          type="text"
          placeholder="Mobile number"
          className={`${errors.mobile ? "border-red-500" : ""}`}
        />
        <div className="">
          <Label>Birthdate</Label>
          <Input
            {...register("birthdate", { required: true })}
            type="date"
            placeholder="birthdate"
            className={`${errors.birthdate ? "border-red-500" : ""}`}
          />
        </div>

        <Button type="submit" className="bg-green-800 hover:bg-green-700">
          {SubmitResponse?.isLoading ? "Loading..." : "Create Identity"}
        </Button>
      </form>
    </>
  );
}

export default CreateMemberComponent;
