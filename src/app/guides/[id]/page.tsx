import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GUIDES, destination } from "@/data/content";
type P = { params: Promise<{ id: string }> };
export const generateStaticParams = () => GUIDES.map((g) => ({ id: g.id }));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { id } = await params;
  return { title: GUIDES.find((g) => g.id === id)?.title ?? "מדריך" };
}
export default async function Page({ params }: P) {
  const { id } = await params;
  const g = GUIDES.find((x) => x.id === id);
  if (!g) notFound();
  const d = destination(g.destinationId);
  return (
    <article className="wrap section prose">
      <h1 className="big">{g.title}</h1>
      <p className="lead">{g.lead}</p>
      {g.sections.map((s) => <section key={s.h}><h2 className="mid">{s.h}</h2><p>{s.p}</p></section>)}
      {d && <p><Link className="btn" href={`/destinations/${d.id}`}>המדריך של {d.name}</Link></p>}
    </article>
  );
}
