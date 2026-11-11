import Link from "next/link";
export default function NotFound() {
  return <div className="wrap section"><h1 className="big">אין כאן שלב כזה</h1><p className="lead">הקישור לא מוביל לשום עמוד. חוזרים למפה ובוחרים יעד.</p><Link className="btn" href="/">למפה</Link></div>;
}
