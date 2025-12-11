"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AuthButtonGroup() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="default">
        <Link href="auth/login">Login</Link>
      </Button>
      <Button variant="default" size="default">
        <Link href="auth/register">Register</Link>
      </Button>
    </div>
  );
}
