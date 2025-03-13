import { verifyTokenForFrontEnd } from "@/lib/generateToken";
import AddArtForm from "./AddArtForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("tokenNameInBrowser")?.value;
  const userData = verifyTokenForFrontEnd(token as string);
  if (!userData || !userData.isAdmin) return redirect("/");
  return (
    <section className="grid h-[80vh] place-items-center">
      <AddArtForm />
    </section>
  );
};

export default page;
