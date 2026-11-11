import { CheckCircle2, CircleHelp, CircleDashed } from "lucide-react";
import type { GameEvent } from "@/data/content";

const T = { confirmed: ["תאריך מאומת", CheckCircle2], partial: ["מאומת חלקית", CircleDashed], unverified: ["לא מאומת", CircleHelp] } as const;
export function Status({ status }: { status: GameEvent["status"] }) {
  const [text, Icon] = T[status];
  return <span className={`status ${status}`}><Icon aria-hidden size={16} />{text}</span>;
}
