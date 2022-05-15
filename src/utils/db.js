// JavaScript
// src/firebase.js
import { initializeApp } from 'firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

const addNewComment = (idMovie, taiKhoan, content) => {
  addDoc(collection(db, 'comment', idMovie), {
    user: taiKhoan,
    comment: content,
    like: [],
    rating: 5,
  });
};

const getComment = (idMovie) => {
  return db.collection('comment').doc(idMovie).get();
};

const updateLike = (idMovie, like) => {
  db.collection('comment').doc(idMovie).update({
    like: like,
  });
};

export { addNewComment };
