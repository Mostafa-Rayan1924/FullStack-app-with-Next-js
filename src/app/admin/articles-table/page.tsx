import { getAllArts } from "@/callingApi/getAllArts";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  let { page } = await searchParams;
  let data: any = await getAllArts({ page: page });

  return (
    <div className="my-4">
      <h2 className="text-2xl font-semibold mb-4">
        All Articles <span className="text-primary">({data.data.length})</span>
      </h2>
      <DataTable columns={columns} data={data.data.reverse()} />
    </div>
  );
};

export default page;
