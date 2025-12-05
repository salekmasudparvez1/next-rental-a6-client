"use client";
import { Button } from "@/components/ui/button";

export function AuthButtonGroup() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="default">
        Login
      </Button>
      <Button variant="default" size="default">
        Register
      </Button>
    </div>
  );
}
