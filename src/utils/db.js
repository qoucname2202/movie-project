// JavaScript
// src/firebase.js
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  setDoc,
  onSnapshot,
  addDoc,
  collection,
} from 'firebase/firestore';
import { taiKhoan } from '../configs/settings';

const firebaseConfig = {
  apiKey: 'AIzaSyBgwkuqdK32zkCSqWH9mMcqPBGOqbw8_xo',
  authDomain: 'comment-movie.firebaseapp.com',
  projectId: 'comment-movie',
  storageBucket: 'comment-movie.appspot.com',
  messagingSenderId: '775350638866',
  appId: '1:775350638866:web:4ec12773773f2a6931fbcb',
  measurementId: 'G-R58W88MWEM',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addNewComment = async (idMovie, taiKhoan, content, rating, idComment) => {
  let data = {
    idComment: idComment,
    comment: content,
    timestamp: new Date().getTime(),
    rating: rating,
    user: taiKhoan,
    like: [],
  };
  let document = await doc(collection(db, 'comment'), idMovie);
  let snapshot = await getDoc(document);
  if (snapshot.exists()) {
    let arrcmt = snapshot.data().comment;
    console.log(arrcmt);
    arrcmt.push(data);
    await updateDoc(document, {
      comment: arrcmt,
    });
  } else {
    await setDoc(document, {
      comment: [data],
    });
  }
};

const getComment = async (idMovie) => {
  let document = doc(db, 'comment', idMovie);
  onSnapshot(document, (snapshot) => {
    if (snapshot.exists) {
      return snapshot.data().comment;
    }
  });
};

const getMovie = async (idMovie) => {
  let document = await doc(collection(db, 'detail'), idMovie);
  const docSnap = await getDoc(document);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};

const addMovie = async (idMovie, data) => {
  let document = await doc(collection(db, 'detail'), idMovie);
  await setDoc(document, data);
};

const updateLike = async (idMovie, idComment) => {
  let TK = JSON.parse(localStorage.getItem('taiKhoan')).taiKhoan;
  let document = doc(db, 'comment', idMovie);
  const snapshot = await getDoc(document);
  let arrcmt = snapshot.data().comment;
  snapshot.data().comment.map((comment, index) => {
    if (comment.idComment === idComment) {
      if (comment.like.includes(TK)) {
        arrcmt[index].like.splice(comment.like.indexOf(TK), 1);
        setDoc(
          snapshot.ref,
          {
            comment: arrcmt,
          },
          {
            merge: false,
          },
        );
      } else {
        arrcmt[index].like.push(TK);
        setDoc(
          snapshot.ref,
          {
            comment: arrcmt,
          },
          {
            merge: false,
          },
        );
      }
    }
  });
};

export { db, addNewComment, getComment, updateLike, getMovie, addMovie };
