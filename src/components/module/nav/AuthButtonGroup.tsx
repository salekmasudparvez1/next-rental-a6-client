"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AuthButtonGroup() {
  return (
    <div className="flex gap-1.5 sm:gap-2">
      <Button variant="outline" size="sm" className="h-8 sm:h-9 px-2 sm:px-4 text-xs sm:text-sm">
        <Link href="auth/login">Login</Link>
      </Button>
      <Button variant="default" size="sm" className="h-8 sm:h-9 px-2 sm:px-4 text-xs sm:text-sm">
        <Link href="auth/register">Register</Link>
      </Button>
    </div>
  );
}
