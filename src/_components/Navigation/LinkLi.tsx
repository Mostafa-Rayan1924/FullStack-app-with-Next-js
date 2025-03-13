"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LinkLi = ({
  link,
  isAdmin,
}: {
  link: { id: number; url: string; title: string };
  isAdmin: boolean | undefined;
}) => {
  const pathname = usePathname();

  // Prevent rendering "Admin" link if the user is not an admin
  if (!isAdmin && link.title === "Admin") return null;

  return (
    <li
      className={`font-semibold ${
        pathname === link.url ? "text-primary" : ""
      } hover:text-primary md:text-base lg:text-lg hover:scale-105 capitalize duration-300`}
      key={link.id}>
      <Link href={link.url}>{link.title}</Link>
    </li>
  );
};

export default LinkLi;
