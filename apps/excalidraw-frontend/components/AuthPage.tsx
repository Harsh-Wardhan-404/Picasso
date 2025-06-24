"use client"
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/libs/utils"
import axios from "axios";

import { HTTP_BACKEND } from "../config";
import Link from "next/link";

axios.defaults.withCredentials = true;

export function AuthPage({ isSignUp }: { isSignUp: boolean }) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function SignIn(email: string, password: string) {
    //auth
    try {
      const res = await axios.post(`${HTTP_BACKEND}/signin`, {
        data: {
          email,
          password
        }
      });
      //if ok, create room
      if (res.data.success) {
        console.log("AUTH TOKEN RETURNED FROM BE: ", res.data.token);
        localStorage.setItem('auth_token', res.data.token);
        const roomRes = await axios.post(`${HTTP_BACKEND}/create-room`);
        if (roomRes.data.slug) {
          window.location.href = `/canvas/${roomRes.data.slug}`;
        }
      }
      return res.data;
    }
    catch (error) {
      console.error("Signin failed:", error);
      return { error: "Authentication failed" };
    }
  }


  async function SignUp(email: string, password: string, name: string) {
    const res = await axios.post(`${HTTP_BACKEND}/signup`, {
      data: {
        email,
        password,
        name
      }
    })
    if (res.data.success) {
      const roomRes = await axios.post(`${HTTP_BACKEND}/create-room`);
      if (roomRes.data.slug) {
        window.location.href = `/canvas/${roomRes.data.slug}`;
      }
    }
    return res.data;
  }



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(email);
    // console.log(password);
    // console.log(name);

    const res = isSignUp ? await SignUp(email, password, name) : await SignIn(email, password);
    console.log("HAndle submit done", res);
  }
  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black border-4 border-teal-500">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Picasso
      </h2>
      {/* <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p> */}

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          {isSignUp && (
            <>
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input id="firstname" placeholder="Tyler" type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input id="lastname" placeholder="Durden" type="text" />
              </LabelInputContainer>
            </>
          )}

        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </LabelInputContainer>
        {/* <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword">Your twitter password</Label>
          <Input
            id="twitterpassword"
            placeholder="••••••••"
            type="twitterpassword"
          />
        </LabelInputContainer> */}

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          {isSignUp ? "Sign up" : "Login"}  &rarr;
          <BottomGradient />
        </button>

        {isSignUp && <div className="text-white flex flex-row justify-center mt-7">Already have an account?

          <Link href={'/signin'} className="cursor-pointer ml-1 underline">Login</Link>
        </div>}


        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />


      </form>
    </div>
  );
}






const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
