/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { toast } from "sonner";
import { ActionRegisterUser } from "@/app/actions/(registration)/ActionRegisterUser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { redirect } from "next/navigation";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  nationalId: string;
  mobileNumber: string;
};
function Page() {
  const [creationResponse, setCreationResponse] = useState({
    message: "",
    status: 201 | 409,
  });
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Handle successful form submission
  const onSubmit: SubmitHandler<FormData> = (data: any) => {
    ActionRegisterUser(data).then((d) => {
      d === 409 &&
        setCreationResponse({ message: "user already exist", status: 409 });
    });
  };

  // Handle form submission errors
  const onError = (errors: any) => {
    // Iterate through each error and display a toast
    Object.values(errors).forEach((error: any) => {
      if (error?.message) {
        toast(error.message, { duration: 10000 });
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit, onError)} method="POST">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {/* First Name */}
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...register("firstName", {
                    required: "First name is required.",
                    minLength: {
                      value: 5,
                      message: "First name must be at least 5 characters long.",
                    },
                  })}
                  type="text"
                  placeholder="John"
                  className={`${errors.firstName ? "border-red-500" : ""}`}
                />
              </div>

              {/* Last Name */}
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register("lastName", {
                    required: "Last name is required.",
                    minLength: {
                      value: 5,
                      message: "Last name must be at least 5 characters long.",
                    },
                  })}
                  type="text"
                  placeholder="Doe"
                  className={`${errors.lastName ? "border-red-500" : ""}`}
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address.",
                    },
                  })}
                  type="email"
                  placeholder="m@example.com"
                  className={`${
                    errors.email || creationResponse.status === 409
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {creationResponse.status === 409 && (
                  <span className="text-red-800">
                    {creationResponse.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  {...register("password", {
                    required: "Password is required.",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters long.",
                    },
                    maxLength: {
                      value: 22,
                      message: "Password cannot exceed 22 characters.",
                    },
                  })}
                  type="password"
                  className={`${errors.password ? "border-red-500" : ""}`}
                />
              </div>

              {/* Date of Birth */}
              <div className="grid gap-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  {...register("dob", {
                    required: "Date of Birth is required.",
                  })}
                  type="date"
                  className={`${errors.dob ? "border-red-500" : ""}`}
                />
              </div>

              {/* National ID */}
              <div className="grid gap-2">
                <Label htmlFor="nationalId">National ID</Label>
                <Input
                  id="nationalId"
                  {...register("nationalId", {
                    required: "National ID is required.",
                    pattern: {
                      value: /^\d{14}$/,
                      message: "National ID must be exactly 14 digits long.",
                    },
                  })}
                  type="text"
                  placeholder="12345678901234"
                  className={`${errors.nationalId ? "border-red-500" : ""}`}
                />
              </div>

              {/* Mobile Number */}
              <div className="grid gap-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  {...register("mobileNumber", {
                    required: "Mobile number is required.",
                    pattern: {
                      value: /^\d{11}$/,
                      message: "Mobile number must be exactly 11 digits long.",
                    },
                  })}
                  type="text"
                  placeholder="01234567890"
                  className={`${errors.mobileNumber ? "border-red-500" : ""}`}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default Page;
