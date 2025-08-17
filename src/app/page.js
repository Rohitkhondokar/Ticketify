import HomePage from "@/components/root/home-page";
import { TicketHeader } from "@/components/tickets/ticketheader";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <TicketHeader />
      <HomePage />
    </>
  );
}
