// Firebase Web SDK Configuration for Ploutos Website
// This configuration matches the mobile app's Firebase project

// Firebase configuration object extracted from google-services.json
const firebaseConfig = {
  apiKey: "AIzaSyADnSTz8tIoPDNdMt6oUQx-u-b7YNgDyjQ",
  authDomain: "ploutoslabs-91b95.firebaseapp.com",
  projectId: "ploutoslabs-91b95",
  storageBucket: "ploutoslabs-91b95.firebasestorage.app",
  messagingSenderId: "136803194140",
  appId: "1:136803194140:web:eda87efdabe3a27853d6d9"
};

// Initialize Firebase (will be imported in registration.js)
let firebaseApp;
let auth;

// Firebase initialization function
function initializeFirebase() {
  if (!window.firebase) {
    console.error('Firebase SDK not loaded. Make sure to include Firebase script tags.');
    return false;
  }

  try {
    // Initialize Firebase
    firebaseApp = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    
    console.log('Firebase initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    return false;
  }
}

// Export configuration and initialization function
window.FirebaseConfig = {
  config: firebaseConfig,
  initializeFirebase,
  getAuth: () => auth,
  getApp: () => firebaseApp
};