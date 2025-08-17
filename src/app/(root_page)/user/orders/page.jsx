import { auth } from "@/auth";
import UserOrdersPage from "@/components/user/user-order";

import React from "react";

async function page() {
  const session = await auth();
  return (
    <div>
      <UserOrdersPage user={session.user} />
    </div>
  );
}

export default page;
