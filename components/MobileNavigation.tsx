"use client";

import useToggle from "@/hooks/useToggle";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Logo from "@/public/Logo";

export default function MobileNavigation({ user }) {
  if (!user) return null;

  const { isOpen, toggle, close } = useToggle();

  return (
    <>
      <Button
        title="Menu button"
        aria-label="Menu"
        className="md:hidden"
        variant={"ghost"}
        size={"icon"}
        onClick={toggle}
      >
        <Menu />
      </Button>
      {isOpen && (
        <nav className="fixed z-9999 inset-0 w-full h-full flex flex-col bg-white p-4 md:hidden">
          <div className="w-full flex items-center justify-between">
            <Logo className="ml-2" />
            <Button title="Close menu" onClick={close} variant={"ghost"}>
              <X />
            </Button>
          </div>
          <ul className="flex flex-col gap-2 h-full">
            <li>
              <Button
                onClick={close}
                asChild
                variant={"ghost"}
                size={"lg"}
                className="w-full justify-start"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </li>
            <li>
              <Button
                onClick={close}
                asChild
                variant={"ghost"}
                size={"lg"}
                className="w-full justify-start"
              >
                <Link href="/recipes">Recipes</Link>
              </Button>
            </li>
            <li>
              <Button
                onClick={close}
                asChild
                variant={"ghost"}
                size={"lg"}
                className="w-full justify-start"
              >
                <Link href="/meals">Meals</Link>
              </Button>
            </li>
            <li>
              <Button
                onClick={close}
                asChild
                variant={"ghost"}
                size={"lg"}
                className="w-full justify-start"
              >
                <Link href="/groceries">Groceries</Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
