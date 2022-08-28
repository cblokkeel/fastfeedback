import db from "./firebase-admin";
import { compareDesc, parseISO } from "date-fns";

/*
  FEEDBACK
 */

export async function getAllFeedbackBySiteId(siteId) {
  try {
    const snapshot = await db
      .collection("feedbacks")
      .where("siteId", "==", siteId)
      .get();

    const retrievedFeedbacks = _getDataFromSnapshot(snapshot);

    retrievedFeedbacks.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { feedbacks: retrievedFeedbacks };
  } catch (error) {
    return { error };
  }
}

/*
  SITES
 */

export async function getAllSites() {
  try {
    const snapshot = await db.collection("sites").get();
    return { sites: _getDataFromSnapshot(snapshot) };
  } catch (error) {
    return { error };
  }
}

/*
  UTILS
 */

const _getDataFromSnapshot = (snapshot) => {
  const data = [];

  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};
