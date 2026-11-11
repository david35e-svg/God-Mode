import { readFileSync } from "node:fs";
import { test, before, after, beforeEach } from "node:test";
import { assertFails, assertSucceeds, initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

let env;
const ADMIN = { email: "david35e@gmail.com", email_verified: true };
const USER = { email: "a@x.com", email_verified: true };
const ctx = (uid, t) => (uid ? env.authenticatedContext(uid, t) : env.unauthenticatedContext()).firestore();
const post = (uid) => ({ uid, authorName: "א", title: "ת", body: "ג", createdAt: serverTimestamp() });
const seed = (fn) => env.withSecurityRulesDisabled((c) => fn(c.firestore()));

before(async () => { env = await initializeTestEnvironment({ projectId: "demo-gmt", firestore: { rules: readFileSync("firestore.rules", "utf8"), host: "127.0.0.1", port: 8085 } }); });
after(() => env.cleanup());
beforeEach(() => env.clearFirestore());

test("posts: public read, verified author only", async () => {
  await assertSucceeds(getDocs(collection(ctx(), "posts")));
  await assertFails(addDoc(collection(ctx(), "posts"), post("x")));
  await assertFails(addDoc(collection(ctx("a", { email: "a@x.com", email_verified: false }), "posts"), post("a")));
  await assertSucceeds(addDoc(collection(ctx("a", USER), "posts"), post("a")));
  await assertFails(addDoc(collection(ctx("a", USER), "posts"), post("b")), "impersonation");
  await assertFails(addDoc(collection(ctx("a", USER), "posts"), { ...post("a"), extra: 1 }));
  await assertFails(addDoc(collection(ctx("a", USER), "posts"), { ...post("a"), createdAt: new Date(0) }));
  await assertFails(addDoc(collection(ctx("a", USER), "posts"), { ...post("a"), body: "x".repeat(4001) }));
});
test("posts: nobody edits, owner or admin deletes", async () => {
  await seed((d) => setDoc(doc(d, "posts/p"), { uid: "a", authorName: "א", title: "ת", body: "ג" }));
  await assertFails(updateDoc(doc(ctx("a", USER), "posts/p"), { body: "x" }));
  await assertFails(deleteDoc(doc(ctx("b", USER), "posts/p")));
  await assertSucceeds(deleteDoc(doc(ctx("a", USER), "posts/p")));
  await seed((d) => setDoc(doc(d, "posts/p"), { uid: "a", authorName: "א", title: "ת", body: "ג" }));
  await assertFails(deleteDoc(doc(ctx("evil", { email: "david35e@gmail.com", email_verified: false }), "posts/p")), "unverified admin email");
  await assertSucceeds(deleteDoc(doc(ctx("admin", ADMIN), "posts/p")));
});
test("plans are private", async () => {
  await seed((d) => setDoc(doc(d, "plans/p"), { uid: "a" }));
  await assertSucceeds(getDoc(doc(ctx("a", USER), "plans/p")));
  await assertFails(getDoc(doc(ctx("b", USER), "plans/p")));
  await assertFails(getDoc(doc(ctx(), "plans/p")));
  const plan = (uid) => ({ uid, interest: "expo", month: 8, days: 5, destinationIds: ["cologne"], createdAt: serverTimestamp() });
  await assertSucceeds(addDoc(collection(ctx("a", USER), "plans"), plan("a")));
  await assertFails(addDoc(collection(ctx("a", USER), "plans"), plan("b")));
});
test("inquiries: anyone sends, only admin reads", async () => {
  const q = { name: "א", email: "a@b.co", message: "ה", consent: true, handled: false, createdAt: serverTimestamp() };
  await assertSucceeds(addDoc(collection(ctx(), "inquiries"), q));
  await assertFails(addDoc(collection(ctx(), "inquiries"), { ...q, consent: false }));
  await assertFails(addDoc(collection(ctx(), "inquiries"), { ...q, email: "nope" }));
  await assertFails(addDoc(collection(ctx(), "inquiries"), { ...q, handled: true }));
  await seed((d) => setDoc(doc(d, "inquiries/i"), { name: "א", handled: false }));
  await assertFails(getDoc(doc(ctx(), "inquiries/i")));
  await assertFails(getDoc(doc(ctx("a", USER), "inquiries/i")));
  await assertSucceeds(getDoc(doc(ctx("admin", ADMIN), "inquiries/i")));
  await assertFails(updateDoc(doc(ctx("admin", ADMIN), "inquiries/i"), { name: "x" }));
  await assertSucceeds(updateDoc(doc(ctx("admin", ADMIN), "inquiries/i"), { handled: true }));
});
test("reports and unknown collections", async () => {
  await assertFails(addDoc(collection(ctx(), "reports"), { postId: "p", uid: "x", createdAt: serverTimestamp() }));
  await assertSucceeds(addDoc(collection(ctx("a", USER), "reports"), { postId: "p", uid: "a", createdAt: serverTimestamp() }));
  await assertFails(getDocs(collection(ctx("a", USER), "reports")));
  await assertFails(setDoc(doc(ctx("admin", ADMIN), "secret/x"), { a: 1 }));
  await assertFails(getDoc(doc(ctx(), "users/x")));
});
test("clicks: anonymous count, admin reads", async () => {
  const c = { partner: "booking", page: "/destinations/tokyo", createdAt: serverTimestamp() };
  await assertSucceeds(addDoc(collection(ctx(), "clicks"), c));
  await assertFails(addDoc(collection(ctx(), "clicks"), { ...c, uid: "x" }));
  await assertFails(addDoc(collection(ctx(), "clicks"), { ...c, page: "https://evil" }));
  await assertFails(getDocs(collection(ctx("a", USER), "clicks")));
  await assertSucceeds(getDocs(collection(ctx("admin", ADMIN), "clicks")));
});
