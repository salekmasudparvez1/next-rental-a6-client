import { headers } from "next/headers";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

async function getSiteData(domain: string | null) {
  // Replace this with your real DB/fetch logic
  return {
    name: domain ?? "My Website",
  };
}

export default async function NotFound() {
  const headersList = await headers();
  const host =
    headersList.get("host") ??
    process.env.NEXT_PUBLIC_URL ??
    "findbasa.netlify.app";
  const data = await getSiteData(host);

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-white p-4">
      <Card className="max-w-md w-full text-center shadow-xl bg-gray-400 border border-slate-700">
        <CardHeader>
          <CardTitle className="text-5xl text-black">404</CardTitle>
          <CardDescription className="text-gray-800 mt-2">
            Not Found: {data.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-100 mb-6">
            The page you are looking for does not exist.
          </p>
          <Link href="/" passHref>
            <Button variant="default" className="w-full">
              Go to Homepage
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
