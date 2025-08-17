"use client";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/route";

function Social() {
  const onClick = (provider) => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT_URL,
    });
  };
  return (
    <div className="flex  items-center w-full gap-2 pt-4">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => {
          onClick("google");
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      {/* <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => {
          onClick("github");
        }}
      >
        <FaGithub className="h-5 w-5" />
      </Button> */}
    </div>
  );
}

export default Social;
