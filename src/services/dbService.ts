import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import the initialized db instance
import type { GameProgress, AdminAnalyticsData } from "../types";

const USERS_COLLECTION = 'users';

export const dbService = {
  /**
   * Fetches a user's progress from Firestore.
   * @param uid - The user's unique ID from Firebase Auth.
   * @returns The user's saved progress, or null if they are a new user.
   */
  getUserProgress: async (uid: string): Promise<GameProgress | null> => {
    const docRef = doc(db, USERS_COLLECTION, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as GameProgress;
    } else {
      console.log("No such document! User is new.");
      return null;
    }
  },

  /**
   * Saves or updates a user's progress in Firestore.
   * @param uid - The user's unique ID.
   * @param progress - The user's progress data to save.
   */
  saveUserProgress: async (uid: string, progress: GameProgress): Promise<void> => {
    const docRef = doc(db, USERS_COLLECTION, uid);
    await setDoc(docRef, progress, { merge: true }); 
  },

  /**
   * Clears a user's data from Firestore.
   * @param uid - The user's unique ID.
   */
  clearUserProgress: async(uid: string): Promise<void> => {
    const docRef = doc(db, USERS_COLLECTION, uid);
    await deleteDoc(docRef);
  },

  /**
   * Fetches and aggregates analytics data from all users in Firestore.
   */
  getAdminAnalytics: async(): Promise<AdminAnalyticsData> => {
    const usersCollectionRef = collection(db, USERS_COLLECTION);
    const querySnapshot = await getDocs(usersCollectionRef);

    const allProgress: GameProgress[] = [];
    querySnapshot.forEach((doc) => {
      allProgress.push(doc.data() as GameProgress);
    });

    if (allProgress.length === 0) {
      return {
        totalUsers: 0,
        avgPoints: 0,
        personaDistribution: [],
        coursePopularity: [],
        totalConceptsCompleted: 0,
      };
    }
    
    const totalUsers = allProgress.length;
    const totalPointsSum = allProgress.reduce((sum, p) => sum + p.totalPoints, 0);
    const avgPoints = Math.round(totalPointsSum / totalUsers);
    
    const totalConceptsCompleted = allProgress.reduce((sum, p) => sum + Object.keys(p.completedSteps).length, 0);

    const personaCounts: Record<string, number> = {};
    const courseCounts: Record<string, number> = {};

    for (const progress of allProgress) {
        if (progress.userPersona) {
            const personaName = progress.userPersona.charAt(0).toUpperCase() + progress.userPersona.slice(1);
            personaCounts[personaName] = (personaCounts[personaName] || 0) + 1;
        }
        if (progress.courseMode) {
            let courseName = '';
            if (progress.userPersona === 'doctor') courseName = 'MedTech Concepts';
            else if (progress.courseMode === 'swe') courseName = 'SWE Concepts';
            else courseName = 'Coding Fundamentals';
            courseCounts[courseName] = (courseCounts[courseName] || 0) + 1;
        }
    }

    const personaDistribution = Object.entries(personaCounts).map(([persona, count]) => ({ persona, count }));
    const coursePopularity = Object.entries(courseCounts).map(([course, count]) => ({ course, count }));

    return {
      totalUsers,
      avgPoints,
      personaDistribution,
      coursePopularity,
      totalConceptsCompleted,
    };
  }
};
