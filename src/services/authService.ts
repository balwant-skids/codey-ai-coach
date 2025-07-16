import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import the initialized auth instance
import type { AuthUser } from '../types';
import { dbService } from './dbService';

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

    const isWhitelisted = await dbService.isUserWhitelisted(result.user.email || '');

    if (!isWhitelisted) {
      throw new Error("User is not whitelisted. Please contact support.");
    }

    // Create user in database after successful authentication
    const appUser: AuthUser = {
      uid: result.user.uid,
      name: result.user.displayName || 'Anonymous',
      email: result.user.email || '',
      isLoggedIn: true,
    };
    
    try {
      await dbService.createUser(appUser);
    } catch (error) {
      console.error('Failed to create user in database:', error);
      // Don't throw here - authentication was successful, just database creation failed
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
          isLoggedIn: true,
        };
        callback(appUser);
      } else {
        callback(null);
      }
    });
  }
};
