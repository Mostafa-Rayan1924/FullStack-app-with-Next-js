import { ArticleType } from "@/types/type";
import { Article } from "@prisma/client";
import { Captions } from "lucide-react";
import Link from "next/link";

const ArticleItem = ({ article }: { article: Article }) => {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="border border-border p-3  space-y-2 hover:border-primary hover:-translate-y-2.5 duration-300 rounded-lg even:bg-accent">
      <div className=" flex items-center gap-2">
        <Captions className="size-6 text-primary  flex-shrink-0" />
        <h2 className="font-semibold line-clamp-1 ">{article.title}</h2>
      </div>
      <p className="text-muted-foreground line-clamp-2">{article.desc}</p>
    </Link>
  );
};

export default ArticleItem;
