// // // lib/firebase.ts
// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: "AIzaSyAdfS6Hr4QjsNSnAF-DR1YJsoOUFlA9K5g",
// //   authDomain: "model-cabin.firebaseapp.com",
// //   projectId: "model-cabin",
// //   storageBucket: "model-cabin.firebasestorage.app",
// //   messagingSenderId: "1044905600246",
// //   appId: "1:1044905600246:web:c90a51f1aac1cb3749b8d7",
// //   measurementId: "G-B91DPYM255"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);


// // lib/firebase.ts
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth"; //
// import { getAnalytics, isSupported } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyAdfS6Hr4QjsNSnAF-DR1YJsoOUFlA9K5g",
//   authDomain: "model-cabin.firebaseapp.com",
//   projectId: "model-cabin",
//   storageBucket: "model-cabin.firebasestorage.app",
//   messagingSenderId: "1044905600246",
//   appId: "1:1044905600246:web:c90a51f1aac1cb3749b8d7",
//   measurementId: "G-B91DPYM255"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Auth
// export const auth = getAuth(app); //

// // Analytics (Safe check for SSR)
// export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;


import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Add this
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAdfS6Hr4QjsNSnAF-DR1YJsoOUFlA9K5g",
  authDomain: "model-cabin.firebaseapp.com",
  projectId: "model-cabin",
  storageBucket: "model-cabin.firebasestorage.app",
  messagingSenderId: "1044905600246",
  appId: "1:1044905600246:web:c90a51f1aac1cb3749b8d7",
  measurementId: "G-B91DPYM255",
};

// Initialize Firebase (Singleton pattern to prevent multiple app errors)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app); // Export db so the dashboard can use it

// Analytics (Safe check for SSR)
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;