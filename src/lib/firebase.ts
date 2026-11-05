import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged, User } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  Firestore,
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App singleton
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore (with databaseId if provided)
export const db: Firestore = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Ensure anonymous authentication for each visitor
export const initAuth = (): Promise<User | null> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        resolve(user);
      } else {
        try {
          const cred = await signInAnonymously(auth);
          resolve(cred.user);
        } catch (error) {
          console.warn("Anonymous sign-in skipped or failed:", error);
          resolve(null);
        }
      }
    });
  });
};

// Save user profile state to Firestore
export const syncUserProfileToFirebase = async (
  userId: string,
  profileData: {
    name: string;
    level: number;
    xp: number;
    nextLevelXp: number;
    characterClass: string;
    coins: number;
    language?: string;
  }
) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(
      userRef,
      {
        ...profileData,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error("Failed to sync profile to Firebase:", error);
    return false;
  }
};

// Load user profile from Firestore
export const loadUserProfileFromFirebase = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    console.error("Failed to load user profile from Firebase:", error);
    return null;
  }
};

// Save an inquiry to Firestore
export const submitInquiryToFirebase = async (data: {
  fullName: string;
  email: string;
  phone: string;
  selectedPkg: string;
  travelersCount: string;
  language: string;
  userId?: string;
}) => {
  try {
    const inquiriesCol = collection(db, "inquiries");
    const docRef = await addDoc(inquiriesCol, {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Failed to submit inquiry to Firebase:", error);
    throw error;
  }
};

// Save a trip to Firestore
export const saveTripToFirebase = async (trip: any) => {
  try {
    const tripsCol = collection(db, "trips");
    const docRef = await addDoc(tripsCol, {
      ...trip,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Failed to save trip to Firebase:", error);
    throw error;
  }
};

// Load trips for a user
export const loadUserTripsFromFirebase = async (userId: string) => {
  try {
    const { query, where, getDocs, orderBy, limit } = await import("firebase/firestore");
    const tripsCol = collection(db, "trips");
    const q = query(
      tripsCol,
      where("uid", "==", userId),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.warn("Could not query trips with index, falling back to basic query:", error);
    try {
      const { query, where, getDocs } = await import("firebase/firestore");
      const tripsCol = collection(db, "trips");
      const q = query(tripsCol, where("uid", "==", userId));
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (e2) {
      console.error("Failed to load user trips from Firebase:", e2);
      return [];
    }
  }
};

// Join an Event Crew ("Who is going to this event")
export const joinEventCrewFirebase = async (crewData: {
  eventId: string;
  eventTitle: string;
  uid: string;
  displayName: string;
  departureCity: string;
  travelDates: string;
  travelStyle: string;
  bio: string;
}) => {
  try {
    const crewsCol = collection(db, "event_crews");
    const docRef = await addDoc(crewsCol, {
      ...crewData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Failed to join event crew in Firebase:", error);
    throw error;
  }
};

// Load gamers flying to a specific event
export const loadEventCrewFirebase = async (eventId: string) => {
  try {
    const { query, where, getDocs } = await import("firebase/firestore");
    const crewsCol = collection(db, "event_crews");
    const q = query(crewsCol, where("eventId", "==", eventId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Failed to load event crew from Firebase:", error);
    return [];
  }
};

// Load all event crew members for community hub
export const loadAllEventCrewsFirebase = async () => {
  try {
    const { getDocs, limit, query } = await import("firebase/firestore");
    const crewsCol = collection(db, "event_crews");
    const q = query(crewsCol, limit(50));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Failed to load all event crews from Firebase:", error);
    return [];
  }
};

// Save a community post
export const createCommunityPostFirebase = async (post: {
  author: string;
  authorUid?: string;
  avatar: string;
  destination: string;
  eventId?: string;
  eventName?: string;
  content: string;
  category: string;
}) => {
  try {
    const postsCol = collection(db, "community_posts");
    const docRef = await addDoc(postsCol, {
      ...post,
      likes: 0,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Failed to create community post:", error);
    throw error;
  }
};

// Load all community posts
export const loadCommunityPostsFirebase = async () => {
  try {
    const { getDocs, query, limit } = await import("firebase/firestore");
    const postsCol = collection(db, "community_posts");
    const q = query(postsCol, limit(30));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Failed to load community posts:", error);
    return [];
  }
};

// Load all trips (Admin)
export const loadAllTripsAdminFirebase = async () => {
  try {
    const { getDocs, query, limit } = await import("firebase/firestore");
    const tripsCol = collection(db, "trips");
    const q = query(tripsCol, limit(50));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Failed to load all trips for admin:", error);
    return [];
  }
};

