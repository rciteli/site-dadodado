// app/(dashboard)/dashboard/pendulo-digital/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ensureClientSlugForUser } from "@/libs/server/bootstrap";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");

  const user = session.user as typeof session.user & { id?: string };
  const slug = await ensureClientSlugForUser({
    id: user.id, // <- agora tipado ou use cast
    email: user.email ?? undefined,
    name: user.name ?? undefined,
  });

  // esta rota é /dashboard/pendulo-digital (sem slug) => redireciona para /dashboard/[slug]/pendulo-digital
  redirect(`/dashboard/${slug}/pendulo-digital`);
}
