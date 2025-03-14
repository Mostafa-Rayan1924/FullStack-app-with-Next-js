import { verifyTokenForFrontEnd } from "@/lib/generateToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("tokenNameInBrowser")?.value;
  const userData = verifyTokenForFrontEnd(token as string);
  if (!userData || !userData.isAdmin) return redirect("/");
  return (
    <div className=" mt-28 container">
      <AdminSidebar />
      <div>{children}</div>
    </div>
  );
}
