// Firebase web config, read from NEXT_PUBLIC_FIREBASE_* environment variables (.env.production locally,
// Vercel → Project Settings → Environment Variables in deployment). Each variable must be referenced
// literally as process.env.NEXT_PUBLIC_... so Next.js can inline it into the client bundle at build time.
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Analytics only reports from production builds (so local development doesn't pollute the data) and
// stays off when the variables it needs are missing
export const ANALYTICS_ENABLED =
  process.env.NODE_ENV === 'production' &&
  Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId && firebaseConfig.measurementId);
