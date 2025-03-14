"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Delete, Edit2, MoreHorizontal, View } from "lucide-react";
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
import DeleteComment from "@/_components/ArticlesPage/comments/DeleteComment";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/constants/domain";
import axios from "axios";
import toast from "react-hot-toast";
export type Articles = {
  id: string;
  title: string;
  createdAt: Date;
  desc: string;
};

export const columns: ColumnDef<Articles>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
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
    accessorKey: "desc",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const article = row.original;
      let router = useRouter();
      const handleDelete = async () => {
        try {
          let response = await axios.delete(
            `${DOMAIN}/api/articles/${article?.id}`
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
                <Link href={`/articles/${article.id}`}>View</Link>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteItem onConfirm={() => handleDelete()} />
            <DropdownMenuItem>
              <div className="flex items-center gap-1">
                <Edit2 className="size-4 text-green-500" />
                edit
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
