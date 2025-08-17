// app/logout/page.tsx
// ✅ This must come from server-side NextAuth config
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function LogoutPage() {
  async function logoutAction() {
    "use server";
    await signOut({ redirect: false });
    redirect("/");
  }

  return (
    <form action={logoutAction}>
      <input
        type="submit"
        value="Sign out"
        className="text-black hover:bg-transparent hover:text-[#1A9CB7] cursor-pointer bg-transparent border-none"
      />
    </form>
  );
}
