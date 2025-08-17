// "use client"
import { auth, signOut } from "@/auth";
import LogoutButton from "@/components/auth/signOut";
import React from "react";

async function page() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <LogoutButton />
    </div>
  );
}

export default page;
