"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
export function ShelfLink({ href, partner, sponsored, children }: { href: string; partner: string; sponsored: boolean; children: ReactNode }) {
  const page = usePathname();
  return (
    <a className="btn small" href={href} target="_blank" rel={sponsored ? "sponsored noopener noreferrer" : "noopener noreferrer"}
      onClick={() => { addDoc(collection(db(), "clicks"), { partner, page: page.slice(0, 120), createdAt: serverTimestamp() }).catch(() => {}); }}>
      {children}
    </a>
  );
}
