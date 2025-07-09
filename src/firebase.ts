// firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
 apiKey: "AIzaSyBOW5kWbvqexfn8JXvvUtAwPlbHXCkoh3M",
  authDomain: "pocket-management-93dba.firebaseapp.com",
  projectId: "pocket-management-93dba",
  storageBucket: "pocket-management-93dba.appspot.com", // Corrected .app to .appspot.com
  messagingSenderId: "602070514808",
  appId: "1:602070514808:web:d9156bd1cd73fec6d6418d"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

// Vapid key for push notifications
const vapidKey = "your-vapid-key";

// Request permission for push notifications
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      
      // Get registration token
      const token = await getToken(messaging, { vapidKey });
      console.log('Registration token:', token);
      
      // Save token to user's profile in Firestore
      // You can implement this based on your user management system
      
      return token;
    } else {
      console.log('Notification permission denied.');
      return null;
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return null;
  }
};

// Listen for foreground messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export default app;