"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { DOMAIN } from "@/constants/domain";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
const CommentBar = ({ articleId }: { articleId: string }) => {
  let [comment, setComment] = useState<string>("");
  let [error, setError] = useState<string>("");
  let router = useRouter();
  let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let params = {
      articleId: parseInt(articleId),
      text: comment,
    };
    e.preventDefault();
    if (comment.trim() == "") {
      setError("Please enter a comment term");
      return;
    }
    try {
      let res = await axios.post(`${DOMAIN}/api/comments`, params);
      if (res.status === 201) {
        setComment("");
        toast.success("Comment added successfully");
        router.refresh();
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };
  return (
    <div className="my-6  ">
      <form className="w-full md:max-w-3xl md:mx-auto" onSubmit={handleSubmit}>
        <div className="flex  w-full  gap-2">
          <div className="w-full">
            <input
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                setError("");
              }}
              className="border-border w-full bg-background border-dotted border-2 p-2 rounded-lg  outline-none focus:border-primary"
              type="comment"
              placeholder="Enter your comment"
            />
            {error ? <p className="text-red-500 text-sm">{error}</p> : ""}
          </div>
          <Button
            className={(buttonVariants({ size: "lg" }), "py-2 px-8")}
            type="submit">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentBar;
