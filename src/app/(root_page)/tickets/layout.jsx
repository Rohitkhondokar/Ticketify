// import Footer from "@/components/layout/footer";
import { TicketHeader } from "@/components/tickets/ticketheader";

import React from "react";

function layout({ children }) {
  return (
    <div>
      <TicketHeader />
      {children}
      {/* <Footer /> */}
    </div>
  );
}

export default layout;
