import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";
import DashboardLayoutClient from "./DashboardLayoutClient";

export const metadata = {
  title: "Kara Admin Dashboard",
  description: "Kara website content management",
};

export default async function DashboardLayout({ children }) {
  const session = await getSession();
  if (!session) {
    redirect("/kara-admin");
  }

  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
