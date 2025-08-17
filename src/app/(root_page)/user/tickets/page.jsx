import { auth } from "@/auth";
import UserTicketsPage from "@/components/user/user-ticket";
import React from "react";

async function page() {
  const session = await auth();
  return (
    <div>
      <UserTicketsPage user={session.user} />
    </div>
  );
}

export default page;
