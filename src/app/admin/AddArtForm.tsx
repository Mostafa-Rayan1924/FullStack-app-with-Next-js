"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MainTitle from "@/_components/Sharable/MainTitle";
import InputRerender from "@/_components/Sharable/Input";
import { ArtAddSchema } from "@/_components/validation/ArtForm";
import axios from "axios";
import { DOMAIN } from "@/constants/domain";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import LoadingBtn from "@/_components/Sharable/LoadingBtn";
const AddArtForm = () => {
  let router = useRouter();
  let [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ArtAddSchema>>({
    resolver: zodResolver(ArtAddSchema),
    mode: "onChange",
  });
  async function onSubmit(values: z.infer<typeof ArtAddSchema>) {
    let params = {
      title: values.title,
      desc: values.desc,
    };
    try {
      setLoading(true);
      let response = await axios.post(`${DOMAIN}/api/articles`, params);
      if (response.status == 201) {
        toast.success("Article added successfully");
        form.reset({
          title: "",
          desc: "",
        });
        setLoading(false);

        router.refresh();
      }
    } catch (e: any) {
      toast.error(e.response.data.message);
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
        <MainTitle title="Add Article" />
        <div className="max-w-[600px] border-border border-dotted border-2 p-4 rounded-lg space-y-4 mx-auto">
          <InputRerender
            form={form}
            name="title"
            label="Enter title"
            type="text"
            placeholder="enter article title"
          />

          <InputRerender
            form={form}
            name="desc"
            label="Enter description"
            type="textarea"
            placeholder="enter article description"
          />
          <Button disabled={loading} className={`w-full`} type="submit">
            {loading ? <LoadingBtn /> : "Add Article"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddArtForm;
