import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, getDocs, query, where, limit, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { Creator, getCreator, saveCreatorToCache, QuizQuestion, DEFAULT_QUIZ_QUESTIONS } from "@/utils/creators";

// Default Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "kitchen-scraps-quiz.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "kitchen-scraps-quiz",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "kitchen-scraps-quiz.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

const PROJECT_ID = firebaseConfig.projectId;

// Initialize Firebase App & Firestore SDK if API key is present
let db: ReturnType<typeof getFirestore> | null = null;
try {
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  if (firebaseConfig.apiKey) {
    db = getFirestore(app);
  }
} catch (e) {
  console.warn("Firebase SDK initialization warning:", e);
}

interface FirestoreFieldValue {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  arrayValue?: { values?: FirestoreFieldValue[] };
  mapValue?: { fields?: Record<string, FirestoreFieldValue> };
  nullValue?: null;
  timestampValue?: string;
}

interface FirestoreRestDoc {
  name?: string;
  fields?: Record<string, FirestoreFieldValue>;
}

export type RawCreatorRecord = Record<string, any>;

// Recursively convert Firestore REST document JSON into plain JS values
function parseFirestoreRestValue(val: FirestoreFieldValue): any {
  if (!val || typeof val !== "object") return val;
  if (val.stringValue !== undefined) return val.stringValue;
  if (val.integerValue !== undefined) return parseInt(val.integerValue, 10);
  if (val.doubleValue !== undefined) return Number(val.doubleValue);
  if (val.booleanValue !== undefined) return Boolean(val.booleanValue);
  if (val.nullValue !== undefined) return null;
  if (val.timestampValue !== undefined) return val.timestampValue;
  if (val.arrayValue !== undefined) {
    const values = val.arrayValue.values || [];
    return values.map(parseFirestoreRestValue);
  }
  if (val.mapValue !== undefined) {
    const fields = val.mapValue.fields || {};
    const obj: Record<string, any> = {};
    for (const [k, v] of Object.entries(fields)) {
      obj[k] = parseFirestoreRestValue(v);
    }
    return obj;
  }
  return val;
}

// Convert Firestore REST document JSON into plain JS object
export function parseFirestoreRestFields(docJson: FirestoreRestDoc): RawCreatorRecord {
  if (!docJson || !docJson.fields) return {};
  const res: RawCreatorRecord = {};
  for (const [key, val] of Object.entries(docJson.fields)) {
    res[key] = parseFirestoreRestValue(val);
  }
  if (docJson.name) {
    const parts = docJson.name.split("/");
    res.id = parts[parts.length - 1];
  }
  return res;
}

// Helper to normalize any raw question object into a QuizQuestion interface
export function normalizeQuizQuestion(qItem: any): QuizQuestion | null {
  if (!qItem || typeof qItem !== "object") return null;

  // 1. Extract question text
  const questionStr = String(
    qItem.questionText ||
    qItem.question_text ||
    qItem.question ||
    qItem.title ||
    qItem.text ||
    ""
  ).trim();

  if (!questionStr) return null;

  // 2. Extract options
  let optionsList: string[] = [];
  const rawOptions = qItem.options || qItem.choices || qItem.answers;

  if (Array.isArray(rawOptions)) {
    optionsList = rawOptions
      .map((opt: any) => {
        if (opt === null || opt === undefined) return "";
        if (typeof opt === "object") {
          return String(
            opt.text ||
            opt.label ||
            opt.option ||
            opt.value ||
            opt.title ||
            (Object.values(opt)[0] && typeof Object.values(opt)[0] === "string" ? Object.values(opt)[0] : "") ||
            ""
          );
        }
        return String(opt);
      })
      .filter((s) => s.trim().length > 0);
  } else if (typeof rawOptions === "string") {
    optionsList = rawOptions.split(",").map((s) => s.trim()).filter(Boolean);
  }

  if (optionsList.length === 0) {
    optionsList = ["Go", "No-Go"];
  }

  // 3. Extract correct index
  let correctIdx = 0;
  if (qItem.correctAnswerIndex !== undefined && qItem.correctAnswerIndex !== null) {
    correctIdx = Number(qItem.correctAnswerIndex);
  } else if (qItem.correct_answer_index !== undefined && qItem.correct_answer_index !== null) {
    correctIdx = Number(qItem.correct_answer_index);
  } else if (qItem.correctIdx !== undefined && qItem.correctIdx !== null) {
    correctIdx = Number(qItem.correctIdx);
  } else if (qItem.correct_idx !== undefined && qItem.correct_idx !== null) {
    correctIdx = Number(qItem.correct_idx);
  } else if (qItem.correctOption !== undefined && qItem.correctOption !== null) {
    correctIdx = Number(qItem.correctOption);
  } else if (qItem.answerIdx !== undefined && qItem.answerIdx !== null) {
    correctIdx = Number(qItem.answerIdx);
  } else if (qItem.answerIndex !== undefined && qItem.answerIndex !== null) {
    correctIdx = Number(qItem.answerIndex);
  }

  if (isNaN(correctIdx) || correctIdx < 0 || correctIdx >= optionsList.length) {
    correctIdx = 0;
  }

  // 4. Extract explanation
  const explanation = String(
    qItem.explanation ||
    qItem.desc ||
    qItem.description ||
    "Great job! Keep composting with zero-waste principles."
  );

  return {
    question: questionStr,
    options: optionsList,
    correctIdx,
    explanation,
  };
}

// Helper to normalize any raw document/object into a Creator interface
export function normalizeCreatorDoc(id: string, raw: RawCreatorRecord): Creator {
  const rawId = raw.id || raw.referralCode || raw.code || id || "";
  const cleanId = String(rawId).toLowerCase().trim();
  const fallback = getCreator(cleanId || id);

  const name = String(
    raw.name ||
    raw.displayName ||
    raw.creatorName ||
    raw.title ||
    fallback.name
  );

  const avatar = String(
    raw.avatarUrl ||
    raw.avatar ||
    raw.photoUrl ||
    raw.photo_url ||
    raw.imageUrl ||
    raw.image_url ||
    raw.profileImage ||
    raw.profilePic ||
    fallback.avatar
  );

  let platform: "instagram" | "youtube" | "tiktok" | "blog" = fallback.platform;
  if (raw.platform) {
    const p = String(raw.platform).toLowerCase();
    if (p.includes("youtube") || p.includes("yt")) platform = "youtube";
    else if (p.includes("tiktok") || p.includes("tok")) platform = "tiktok";
    else if (p.includes("blog")) platform = "blog";
    else if (p.includes("instagram") || p.includes("insta")) platform = "instagram";
  }

  const handle = String(
    raw.handle ||
    raw.username ||
    fallback.handle
  );

  let downloads = 0;
  if (raw.downloads !== undefined && raw.downloads !== null && Number(raw.downloads) > 0) {
    downloads = Number(raw.downloads);
  } else if (raw.referredDownloads !== undefined && raw.referredDownloads !== null && Number(raw.referredDownloads) > 0) {
    downloads = Number(raw.referredDownloads);
  } else if (raw.referrals !== undefined && raw.referrals !== null && Number(raw.referrals) > 0) {
    downloads = Number(raw.referrals);
  } else if (raw.installs !== undefined && raw.installs !== null && Number(raw.installs) > 0) {
    downloads = Number(raw.installs);
  } else if (raw.quizPlayedCount !== undefined && raw.quizPlayedCount !== null && Number(raw.quizPlayedCount) > 0) {
    downloads = Number(raw.quizPlayedCount);
  } else if (raw.followers && Number(raw.followers) > 0) {
    downloads = Math.round(Number(raw.followers) * 1.25);
  } else {
    downloads = fallback.downloads || 0;
  }

  const followers = Number(raw.followers ?? raw.followersCount ?? raw.followerCount ?? 1000);
  const badge = String(raw.badge || (raw.isApproved || raw.isVerified || raw.status === "approved" ? "Certified Advocate 🏆" : fallback.badge));

  return {
    id: cleanId,
    name,
    avatar,
    handle,
    platform,
    downloads,
    followers,
    badge,
  };
}

/**
 * Fetch a single creator from Firestore by referral ID / code / handle
 * Tries Firestore SDK first, then Firestore REST API across possible collections ("creators", "users", "advocates")
 */
export async function fetchCreatorFromFirestore(creatorId: string): Promise<Creator | null> {
  if (!creatorId) return null;
  const cleanId = creatorId.toLowerCase().trim().replace(/^@/, "");
  if (!cleanId) return null;

  const collectionsToTry = ["creators", "users", "advocates"];

  const baseId = cleanId.replace(/_(instagram|youtube|tiktok|blog)$/i, "");
  const idsToTry = Array.from(new Set([
    cleanId,
    baseId,
    `${baseId}_instagram`,
    `${baseId}_youtube`,
    `${baseId}_tiktok`,
    `${baseId}_blog`,
  ])).filter(Boolean);

  // 1. Try Firebase Firestore Web SDK if initialized
  if (db) {
    for (const colName of collectionsToTry) {
      for (const docId of idsToTry) {
        try {
          const docRef = doc(db, colName, docId);
          const snapshot = await getDoc(docRef);
          if (snapshot.exists()) {
            const creator = normalizeCreatorDoc(docId, snapshot.data() as RawCreatorRecord);
            saveCreatorToCache(creator);
            return creator;
          }
        } catch (err) {
          console.warn(`Firestore SDK lookup failed on ${colName}/${docId}:`, err);
        }
      }

      // Query by referralCode, code, handle, id or username field
      try {
        const colRef = collection(db, colName);
        for (const fieldName of ["handle", "referralCode", "code", "id", "username"]) {
          for (const matchVal of [cleanId, baseId]) {
            const q = query(colRef, where(fieldName, "==", matchVal), limit(1));
            const querySnap = await getDocs(q);
            if (!querySnap.empty) {
              const data = querySnap.docs[0].data() as RawCreatorRecord;
              const creator = normalizeCreatorDoc(querySnap.docs[0].id, data);
              saveCreatorToCache(creator);
              return creator;
            }
          }
        }
      } catch (err) {
        console.warn(`Firestore SDK query failed on ${colName}:`, err);
      }
    }
  }

  // 2. Fallback / direct query using Firestore REST API
  for (const colName of collectionsToTry) {
    for (const docId of idsToTry) {
      try {
        const directUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${colName}/${docId}`;
        const res = await fetch(directUrl);
        if (res.ok) {
          const json = await res.json();
          const raw = parseFirestoreRestFields(json);
          if (raw && (raw.name || raw.avatarUrl || raw.avatar || raw.imageUrl || raw.handle)) {
            const creator = normalizeCreatorDoc(docId, raw);
            saveCreatorToCache(creator);
            return creator;
          }
        }
      } catch (err) {
        console.warn(`Firestore REST API direct lookup failed on ${colName}/${docId}:`, err);
      }
    }

    // Collection list GET request to search by matching field or document
    try {
      const colUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${colName}?pageSize=100`;
      const colRes = await fetch(colUrl);
      if (colRes.ok) {
        const colJson = await colRes.json();
        const docs = colJson.documents || [];
        for (const d of docs) {
          const raw = parseFirestoreRestFields(d);
          const dId = String(raw.id || "").toLowerCase();
          const refCode = String(raw.referralCode || raw.code || raw.handle || "").toLowerCase().replace(/^@/, "");
          const nameMatch = String(raw.name || "").toLowerCase().replace(/\s+/g, "");

          if (
            dId === cleanId ||
            dId === baseId ||
            refCode === cleanId ||
            refCode === baseId ||
            nameMatch === cleanId ||
            nameMatch === baseId ||
            (dId && dId.includes(baseId))
          ) {
            const normalized = normalizeCreatorDoc(cleanId, raw);
            saveCreatorToCache(normalized);
            return normalized;
          }
        }
      }
    } catch (err) {
      console.warn(`Firestore REST API collection list search failed on ${colName}:`, err);
    }
  }

  return null;
}

/**
 * Fetch all certified creators from Firestore to display on Advocates leaderboard
 */
export async function fetchAllCreatorsFromFirestore(): Promise<Creator[]> {
  const collectionsToTry = ["creators", "users", "advocates"];
  const creatorsMap = new Map<string, Creator>();

  // 1. Try Firebase Firestore SDK
  if (db) {
    for (const colName of collectionsToTry) {
      try {
        const colRef = collection(db, colName);
        const querySnap = await getDocs(colRef);
        querySnap.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
          const data = docSnap.data() as RawCreatorRecord;
          const creator = normalizeCreatorDoc(docSnap.id, data);
          if (creator.name && creator.avatar) {
            creatorsMap.set(creator.id, creator);
          }
        });
      } catch (err) {
        console.warn(`Firestore SDK list failed on ${colName}:`, err);
      }
    }
  }

  // 2. Fallback to REST API
  for (const colName of collectionsToTry) {
    try {
      const colUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${colName}?pageSize=100`;
      const res = await fetch(colUrl);
      if (res.ok) {
        const json = await res.json();
        const docs = json.documents || [];
        for (const d of docs) {
          const raw = parseFirestoreRestFields(d);
          const creator = normalizeCreatorDoc(String(raw.id || d.name), raw);
          if (creator.name && creator.avatar) {
            creatorsMap.set(creator.id, creator);
          }
        }
      }
    } catch (err) {
      console.warn(`Firestore REST API list failed on ${colName}:`, err);
    }
  }

  return Array.from(creatorsMap.values());
}

/**
 * Fetch creator-specific questions synced from Firestore database.
 * Supports subcollections, creator document arrays, or root questions collection.
 */
export async function fetchCreatorQuestionsFromFirestore(creatorId: string): Promise<QuizQuestion[]> {
  if (!creatorId) return DEFAULT_QUIZ_QUESTIONS;
  const cleanId = creatorId.toLowerCase().trim().replace(/^@/, "");
  if (!cleanId) return DEFAULT_QUIZ_QUESTIONS;

  const collectionsToTry = ["creators", "users", "advocates"];

  // Variations of document IDs to look for
  const baseId = cleanId.replace(/_(instagram|youtube|tiktok|blog)$/i, "");
  const idsToTry = Array.from(new Set([
    cleanId,
    baseId,
    `${baseId}_instagram`,
    `${baseId}_youtube`,
    `${baseId}_tiktok`,
    `${baseId}_blog`,
  ])).filter(Boolean);

  // Helper to extract questions from an object data
  const extractQuestionsFromData = (data: any): QuizQuestion[] => {
    if (!data || typeof data !== "object") return [];
    const rawArr = data.questions || data.quizQuestions || data.quiz_questions || data.items || data.quizData;
    if (Array.isArray(rawArr) && rawArr.length > 0) {
      const list: QuizQuestion[] = [];
      for (const item of rawArr) {
        const parsed = normalizeQuizQuestion(item);
        if (parsed) list.push(parsed);
      }
      return list;
    }
    return [];
  };

  // 1. Try Firebase Firestore SDK if available
  if (db) {
    // A. Check document-level question arrays in /creators/{docId}
    for (const colName of collectionsToTry) {
      for (const docId of idsToTry) {
        try {
          const docRef = doc(db, colName, docId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const fetched = extractQuestionsFromData(docSnap.data());
            if (fetched.length > 0) return fetched;
          }
        } catch (err) {
          console.warn(`Firestore SDK doc questions array error on ${colName}/${docId}:`, err);
        }
      }
    }

    // B. Query collection where handle/id/referralCode matches cleanId or baseId
    for (const colName of collectionsToTry) {
      try {
        const colRef = collection(db, colName);
        for (const fieldName of ["handle", "id", "referralCode", "code", "username"]) {
          for (const matchVal of [cleanId, baseId]) {
            const q = query(colRef, where(fieldName, "==", matchVal), limit(5));
            const querySnap = await getDocs(q);
            if (!querySnap.empty) {
              for (const docSnap of querySnap.docs) {
                const fetched = extractQuestionsFromData(docSnap.data());
                if (fetched.length > 0) return fetched;
              }
            }
          }
        }
      } catch (err) {
        console.warn(`Firestore SDK query error on ${colName}:`, err);
      }
    }

    // C. Check subcollections /creators/{docId}/questions or /creators/{docId}/quiz_questions
    for (const colName of collectionsToTry) {
      for (const docId of idsToTry) {
        for (const subName of ["questions", "quiz_questions", "quizQuestions"]) {
          try {
            const subColRef = collection(db, colName, docId, subName);
            const subColSnap = await getDocs(query(subColRef, limit(100)));
            if (!subColSnap.empty) {
              const fetchedQuestions: QuizQuestion[] = [];
              subColSnap.forEach((docSnap) => {
                const parsed = normalizeQuizQuestion(docSnap.data());
                if (parsed) fetchedQuestions.push(parsed);
              });
              if (fetchedQuestions.length > 0) return fetchedQuestions;
            }
          } catch (err) {
            console.warn(`Firestore SDK subcollection query error on ${colName}/${docId}/${subName}:`, err);
          }
        }
      }
    }

    // D. Try root collections (questions, quiz_questions, quizzes)
    for (const rootCol of ["questions", "quiz_questions", "quizQuestions", "quizzes"]) {
      try {
        const questionsRef = collection(db, rootCol);
        for (const fieldName of ["creatorId", "creator_id", "handle", "creator", "referralCode", "creatorName"]) {
          for (const matchVal of [cleanId, baseId]) {
            const q = query(questionsRef, where(fieldName, "==", matchVal), limit(100));
            const qSnap = await getDocs(q);
            if (!qSnap.empty) {
              const fetchedQuestions: QuizQuestion[] = [];
              qSnap.forEach((docSnap) => {
                const parsed = normalizeQuizQuestion(docSnap.data());
                if (parsed) fetchedQuestions.push(parsed);
              });
              if (fetchedQuestions.length > 0) return fetchedQuestions;
            }
          }
        }
      } catch (err) {
        console.warn(`Firestore SDK root ${rootCol} query error:`, err);
      }
    }
  }

  // 2. Try REST API fallbacks
  for (const colName of collectionsToTry) {
    for (const docId of idsToTry) {
      try {
        // Direct doc GET request for arrays inside creator document
        const directUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${colName}/${docId}`;
        const res = await fetch(directUrl);
        if (res.ok) {
          const json = await res.json();
          const raw = parseFirestoreRestFields(json);
          const fetched = extractQuestionsFromData(raw);
          if (fetched.length > 0) return fetched;
        }

        // REST API for subcollection /creators/{docId}/questions
        for (const subName of ["questions", "quiz_questions"]) {
          const subColUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${colName}/${docId}/${subName}?pageSize=100`;
          const subRes = await fetch(subColUrl);
          if (subRes.ok) {
            const json = await subRes.json();
            const docs = json.documents || [];
            if (docs.length > 0) {
              const fetchedQuestions: QuizQuestion[] = [];
              for (const d of docs) {
                const raw = parseFirestoreRestFields(d);
                const parsed = normalizeQuizQuestion(raw);
                if (parsed) fetchedQuestions.push(parsed);
              }
              if (fetchedQuestions.length > 0) return fetchedQuestions;
            }
          }
        }
      } catch (err) {
        console.warn(`Firestore REST API lookup error on ${colName}/${docId}:`, err);
      }
    }
  }

  // 3. REST API collection list search fallback
  for (const colName of collectionsToTry) {
    try {
      const colUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${colName}?pageSize=100`;
      const colRes = await fetch(colUrl);
      if (colRes.ok) {
        const colJson = await colRes.json();
        const docs = colJson.documents || [];
        for (const d of docs) {
          const raw = parseFirestoreRestFields(d);
          const docId = String(raw.id || "").toLowerCase();
          const refCode = String(raw.referralCode || raw.code || raw.handle || "").toLowerCase().replace(/^@/, "");
          const nameMatch = String(raw.name || "").toLowerCase().replace(/\s+/g, "");

          if (
            docId === cleanId ||
            docId === baseId ||
            refCode === cleanId ||
            refCode === baseId ||
            nameMatch === cleanId ||
            nameMatch === baseId ||
            (docId && docId.includes(baseId))
          ) {
            const fetched = extractQuestionsFromData(raw);
            if (fetched.length > 0) return fetched;
          }
        }
      }
    } catch (err) {
      console.warn(`Firestore REST API collection list search error on ${colName}:`, err);
    }
  }

  // Fallback to default 10-question set
  return DEFAULT_QUIZ_QUESTIONS;
}
