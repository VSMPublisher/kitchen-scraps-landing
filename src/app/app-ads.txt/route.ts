import { appAdsTxt } from "@/lib/appAdsTxt";

export const dynamic = "force-static";

export async function GET() {
  return new Response(appAdsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
