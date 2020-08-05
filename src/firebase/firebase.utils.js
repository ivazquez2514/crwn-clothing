import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDkXEX8Qa5r6AcW-dS6PlWpFkXv5ZI_Ehc",
    authDomain: "crwn-db-197ba.firebaseapp.com",
    databaseURL: "https://crwn-db-197ba.firebaseio.com",
    projectId: "crwn-db-197ba",
    storageBucket: "crwn-db-197ba.appspot.com",
    messagingSenderId: "359865867293",
    appId: "1:359865867293:web:f73842572445ae2ceefaf4",
    measurementId: "G-YLDG49QGYC"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${ userAuth.uid }`);
    
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email, photoURL } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('Error creating user', error);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;