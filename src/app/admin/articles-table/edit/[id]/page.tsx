import { getOneArt } from "@/callingApi/getAllArts";
import EditArtForm from "./EditArtForm";

const EditArticle = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let data = await getOneArt({ id });
  return (
    <section className="grid h-[80vh] place-items-center">
      <EditArtForm id={id} data={data} />
    </section>
  );
};

export default EditArticle;
