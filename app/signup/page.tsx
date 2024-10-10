/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { toast } from "sonner";
import { z } from "zod";
import { ActionRegisterUser } from "../actions/ActionRegisterUser";
import { useState } from "react";
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

const schema = z.object({
  firstName: z
    .string({ invalid_type_error: "error firstname" })
    .min(5, "Password must be at least 5 characters long."),
  lastName: z
    .string({ invalid_type_error: "error lastname" })
    .min(5, "Password must be at least 5 characters long."),
  email: z.string().email("Invalid email address"),
  password: z
    .string()

    .min(5, "Password must be at least 5 characters long.")
    .max(22, "Password cannot exceed 22 characters."),
  dob: z.string().min(5, "Password must be at least 5 characters long."),
  nationalId: z
    .string()
    .length(14, "National ID must be exactly 14 digits long."),
  mobileNumber: z
    .string()
    .length(11, "Mobile number must be exactly 11 digits long."),
});

function page() {
  const clientAction = (formData: FormData) => {
    const validatedFields = schema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      lastName: formData.get("lastName"),
      firstName: formData.get("firstName"),
      mobileNumber: formData.get("mobileNumber"),
      dob: formData.get("dob"),
      nationalId: formData.get("nationalId"),
    });

    if (!validatedFields.success) {
      let errors = validatedFields.error.issues;

      errors.forEach((er, index) => {
        toast(`  ${er.message}`, {duration:10000});
      });

      return;
    }
    ActionRegisterUser(formData);
  };
  return (
    <div>
      <form action={clientAction} method="POST">
        <Card className="mx-auto max-w-sm">
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
                  name="firstName"
                  type="text"
                  placeholder="John"
                />
              </div>

              {/* Last Name */}
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="m@example.com"
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" />
              </div>

              {/* Date of Birth */}
              <div className="grid gap-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" name="dob" type="date" />
              </div>

              {/* National ID */}
              <div className="grid gap-2">
                <Label htmlFor="nationalId">National ID</Label>
                <Input id="nationalId" name="nationalId" type="text" />
              </div>

              {/* Mobile Number */}
              <div className="grid gap-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input id="mobileNumber" name="mobileNumber" type="text" />
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

export default page;
