import { auth } from "@/auth";
import UserProfilePage from "@/components/user/user-profile";

import React from "react";

async function page() {
  const session = await auth();
  return (
    <div>
      <UserProfilePage user={session.user} />
    </div>
  );
}

export default page;
