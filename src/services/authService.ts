import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import the initialized auth instance
import type { AuthUser } from '../types';

// For demonstration, this email will be granted admin privileges
const ADMIN_EMAIL = "admin@coacha.ai";
const provider = new GoogleAuthProvider();

// --- Service Definition ---
export const authService = {
  /**
   * Triggers the Google Sign-In popup flow.
   */
  signInWithGoogle: async (): Promise<FirebaseUser> => {
    const result = await signInWithPopup(auth, provider);
    if (!result.user) {
      throw new Error("Sign in failed, no user returned.");
    }
    return result.user;
  },
  
  /**
   * Signs the current user out.
   */
  signOut: async (): Promise<void> => {
    return signOut(auth);
  },

  /**
   * A listener that reports changes in authentication state.
   * It maps the Firebase User object to our app's AuthUser type.
   */
  onAuthStateChanged: (callback: (user: AuthUser | null) => void): (() => void) => {
    return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const appUser: AuthUser = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || 'Anonymous',
          email: firebaseUser.email || '',
          isAdmin: firebaseUser.email === ADMIN_EMAIL,
        };
        callback(appUser);
      } else {
        callback(null);
      }
    });
  }
};
