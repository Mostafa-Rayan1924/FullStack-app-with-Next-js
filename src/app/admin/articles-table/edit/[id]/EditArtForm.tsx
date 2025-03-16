"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MainTitle from "@/_components/Sharable/MainTitle";
import InputRerender from "@/_components/Sharable/Input";
import { EditArtSchema } from "@/_components/validation/ArtForm";
import axios from "axios";
import { DOMAIN } from "@/constants/domain";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import LoadingBtn from "@/_components/Sharable/LoadingBtn";

const EditArtForm = ({
  id,
  data: { title, desc },
}: {
  id: string;
  data: { title: string; desc: string };
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof EditArtSchema>>({
    resolver: zodResolver(EditArtSchema),
    mode: "onChange",
    defaultValues: { title, desc },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof EditArtSchema>) => {
      try {
        setLoading(true);
        const response = await axios.put(
          `${DOMAIN}/api/articles/${id}`,
          values
        );

        if (response.status === 200) {
          toast.success("Article Edited successfully");
          form.reset({ title: "", desc: "" });
          router.replace("/admin/articles-table");
        }
      } catch (e: any) {
        toast.error(e.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [id, router, form]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <MainTitle title="Edit Article" />
        <div className="max-w-[600px] border-border border-dotted border-2 p-4 rounded-lg space-y-4 mx-auto">
          <InputRerender
            form={form}
            name="title"
            label="Enter title"
            type="text"
            placeholder="Enter article title"
          />
          <InputRerender
            form={form}
            name="desc"
            label="Enter description"
            type="textarea"
            placeholder="Enter article description"
          />
          <Button disabled={loading} className="w-full" type="submit">
            {loading ? <LoadingBtn /> : "Edit Article"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditArtForm;
