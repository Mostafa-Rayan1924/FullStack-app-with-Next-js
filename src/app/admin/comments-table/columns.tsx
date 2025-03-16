"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, MoreHorizontal, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import DeleteItem from "@/callingApi/DeleteItem";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/constants/domain";
import axios from "axios";
import toast from "react-hot-toast";
import { CommentsType } from "@/types/type";
// export type CommentsType = {
//   id: string;
//   text: string;
//   userComments: {
//     username: string;
//   };
//   createdAt: Date;
// };

export const columns: ColumnDef<CommentsType>[] = [
  {
    accessorKey: "text",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          text
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "username",
    header: "User",
    cell: ({ row }) => {
      return <div>{row.original.userComments.username || "Unknown"}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created-At",
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"));
      const formatted = createdAt.toLocaleDateString("en-CA");
      return <div className=" font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const comment = row.original;
      let router = useRouter();
      const handleDelete = async () => {
        try {
          let response = await axios.delete(
            `${DOMAIN}/api/comments/${comment?.id}`
          );
          console.log(response);
          if (response.status === 200) {
            toast.success("Deleted successfully");
            router.refresh();
          }
        } catch (e: any) {
          console.log(e);
          toast.error(e.response.data.message);
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <div className="flex items-center gap-1">
                <View className="size-4 text-gray-500" />
                <Link href={`/articles/${comment.articleId}`}>
                  View article
                </Link>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteItem onConfirm={() => handleDelete()} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
