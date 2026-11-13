/** עוצר פעולה שנתקעת, כדי שהמשתמש יקבל שגיאה ולא כפתור שתקוע על "שולח". */
export function withTimeout<T>(p: Promise<T>, ms = 15000): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject({ code: "timeout" }), ms);
    p.then((v) => { clearTimeout(t); resolve(v); }, (e) => { clearTimeout(t); reject(e); });
  });
}
