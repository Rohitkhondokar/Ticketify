import { auth } from "@/auth";
import UserDashboard from "@/components/user/user-dashboard";
import React from "react";

async function page() {
  const session = await auth();
  return (
    <div>
      <UserDashboard user={session.user} />
    </div>
  );
}

export default page;
