import type { Metadata } from "next";
import { Planner } from "./Planner";
export const metadata: Metadata = { title: "בונה טיול" };
export default function Page() {
  return (
    <div className="wrap section">
      <h1 className="title-l">בונה טיול</h1>
      <p className="lead">שלוש שאלות. התוצאה מחושבת לפי התוכן שבאתר, לפי חוקים קבועים ובלי בינה מלאכותית.</p>
      <Planner />
    </div>
  );
}
