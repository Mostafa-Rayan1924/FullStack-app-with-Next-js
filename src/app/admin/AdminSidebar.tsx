"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { dashboardLinks } from "@/constants/DashboardLinks";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Dashboard = () => {
  let pathname = usePathname();

  return (
    <div className="z-50">
      <Sheet>
        <SheetTrigger className="flex justify-end w-full">
          <LayoutDashboard size={30} />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className={"border-b border-border pb-4 "}>
            <SheetTitle className="text-center ">
              Welcome to Dashboard
            </SheetTitle>
            <SheetDescription className="text-center ">
              <p className="sm:text-lg text-muted-foreground ">
                Here you can manage your content
              </p>
            </SheetDescription>
          </SheetHeader>
          <ul className="flex flex-col gap-4 my-6">
            {dashboardLinks.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-primary ${
                    pathname === item.url ? "bg-accent text-primary" : ""
                  }`}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Dashboard;
