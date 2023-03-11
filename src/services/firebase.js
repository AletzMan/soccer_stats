// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, getBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDoc, doc, query, where, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function userExists(userID) {
  try {
    const docRef = doc(db, 'users', userID);
    const res = await getDoc(docRef);
    console.log(res);
    return res.exists();    
  } catch (error) {
     console.error(error);
  }
}

export async function existsUsername(username) {
  try {
    const users = [];
    const docsRef = collection(db, 'users');
    const q = query(docsRef, where('users', '==', username));
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach(doc => {
      users.push(doc.data());
    });
  } catch (error) {
    console.error(error);
  }

  return users.length > 0 ? users[0].uid : null;
}

export async function registerNewUser(user) {
  try {
    const collectionRef = collection(db, 'users');
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(user) {
  try {
    const collectionRef = collection(db, 'users');
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {
    console.error(error);
  }
}

export async function getUserInfo(uid) {
  try {
    const docRef = doc(db, 'users', uid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    console.error(error);
  }
}


export async function insertNewBet(bet) {
  try {
    const docRef = collection(db, 'bets');
    const res = await addDoc(docRef, bet);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getBetsByUser(uid) {
  const bets = [];
  try {
    const collectionRef = collection(db, 'bets');
    const q = query(collectionRef, where('uid', '==', uid));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      const bet = { ...doc.data() };
      bet.docId = doc.id;
      bets.push(bet);
    });
    return bets;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllBets() {
  const bets = [];
  try {
    const collectionRef = collection(db, 'bets');
    const q = query(collectionRef);
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      const bet = { ...doc.data() };
      bet.docId = doc.id;
      bets.push(bet);
    });
    return bets;
  } catch (error) {
    console.error(error);
  }
}

export async function updateBet(docId, bet) {
  try {
    const docRef = doc(db, 'bets', docId);
    const res = await setDoc(docRef, bet);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteBet(docId) {
  try {
    const docRef = doc(db, 'bets', docId);
    const res = await deleteDoc(docRef);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function setUserProfilePhoto(uid, file) {
  try {
    const imageRef = ref(storage, `images/${uid}`);
    const resUpload = await uploadBytes(imageRef, file);
    return resUpload;
  } catch (error) {
    console.error(error);
  }
}

export async function getProfilePhotoUrl(profilePicture) {
  try {
    const imageRef = ref(storage, profilePicture) ;
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    
  }
}

export async function getUserPublicProfileInfo(uid) {
  const profileInfo = await getUserInfo(uid);
  const linksInfo = await getLinks(uid);
  return {
    profileInfo: profileInfo,
    linksInfo: linksInfo
  }
}

export async function logout() {
  await auth.signOut();
}