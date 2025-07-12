import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

export const fetchAllTests = async () => {
  const testsSnapshot = await getDocs(collection(db, "tests"));
  return testsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
