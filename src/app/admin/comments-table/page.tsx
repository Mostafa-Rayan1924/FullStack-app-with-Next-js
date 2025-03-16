import { getAllComments } from "@/callingApi/getAllArts";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { cookies } from "next/headers";

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("tokenNameInBrowser")?.value;
  let data: any = await getAllComments(token as string);
  return (
    <div className="my-4">
      <h2 className="text-2xl font-semibold mb-4">
        All Comment <span className="text-primary">({data.length})</span>
      </h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;
