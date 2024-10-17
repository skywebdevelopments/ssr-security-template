"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result: any = await signIn("credentials", {
      redirect: false,
      email,
      password,
    }).catch((error: any) => {
      console.log(`error login ${error}`);
    });
    
    if (result.ok) {
      router.push(`/home`); // Redirect to dashboard on success
    } else {
      setError("Invalid credentials, please try again");
    }
  };

  return (
    <div className="m-44 flex flex-row">
      <Card className="w-full m-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="button" onClick={handleSubmit} className="w-full">
            Sign in
          </Button>
        </CardFooter>
        <div className=" text-slate-500 text-sm flex flex-row justify-center">
          <a href="/signup">new user? register here</a>
        </div>
        <div className="flex flex-row m-4  justify-center ">
          <p className="m-auto text-red-900 font-bold">{error && error}</p>
        </div>
      </Card>
    </div>
  );
}
