import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDuW_ZUNtTmO_wOTnDmMBhxxGXq4IXYlMo',
  authDomain: 'vittube-4d7e5.firebaseapp.com',
  projectId: 'vittube-4d7e5',
  storageBucket: 'vittube-4d7e5.appspot.com',
  messagingSenderId: '606928656032',
  appId: '1:606928656032:web:2992f86373b83261dadbc5',
  measurementId: 'G-3CVYP6EWR1'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
