import { redirect } from "next/navigation";
import UserLayoutClient from "./user-layout-client";
import { auth } from "@/auth";

export default async function UserLayout({ children }) {
  // Server-side auth check
  const session = await auth();

  // Redirect if not authenticated
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <UserLayoutClient userData={session.user}>{children}</UserLayoutClient>
  );
}
