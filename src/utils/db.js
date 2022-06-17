// JavaScript
// src/firebase.js
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBgwkuqdK32zkCSqWH9mMcqPBGOqbw8_xo',
  authDomain: 'comment-movie.firebaseapp.com',
  projectId: 'comment-movie',
  storageBucket: 'comment-movie.appspot.com',
  messagingSenderId: '775350638866',
  appId: '1:775350638866:web:4ec12773773f2a6931fbcb',
  measurementId: 'G-R58W88MWEM',
};
// const firebaseConfig = {
//   apiKey: 'AIzaSyBC-hoP6nVS7nlB7_yMC65D1ZlJYwCVUtA',
//   authDomain: 'comment-movie-8e00c.firebaseapp.com',
//   projectId: 'comment-movie-8e00c',
//   storageBucket: 'comment-movie-8e00c.appspot.com',
//   messagingSenderId: '760711066552',
//   appId: '1:760711066552:web:1d1f9594a605153326554d',
//   measurementId: 'G-WH7XVW1LG4',
// };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
export const storage = getStorage(app);

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

// Application movie 24h
const getAppMovie = async () => {
  let querySnapShot = await getDocs(collection(db, 'movie'));
  let movieList = [];
  querySnapShot.forEach((doc) => {
    let movie = {
      id: doc.id,
      title: doc.data().title,
      thumb: doc.data().thumb,
      content: doc.data().content,
      release: doc.data().release,
    };
    movieList.push(movie);
  });
  return movieList;
};
// Add New Application Movie
// const addNewAppMovie = async (movie) => {
//   movie.thumb =
//     'https://firebasestorage.googleapis.com/v0/b/comment-movie.appspot.com/o/images%2Fdefault.jpg?alt=media&token=de9dee08-20c0-4463-9ef2-822e0fa5ed68';
//   await setDoc(doc(collection(db, 'movie')), movie);
// };
// Updated Application Movie
const updateAppMovie = async (movie) => {
  let docRef = doc(collection(db, 'movie'), movie.id);
  let temp = { ...movie };
  delete temp.id;
  const updated = await updateDoc(docRef, {
    ...temp,
  });
  return updated;
};
// Delete Application Movie
const deleteAppMovie = async (movieID) => {
  let document = await doc(collection(db, 'movie'), movieID);
  await deleteDoc(document);
};
// Review
const getAppReview = async () => {
  let querySnapShot = await getDocs(collection(db, 'review'));
  let reviewList = [];
  querySnapShot.forEach((doc) => {
    let review = {
      id: doc.id,
      title: doc.data().title,
      thumb: doc.data().thumb,
      content: doc.data().content,
      release: doc.data().release,
    };
    reviewList.push(review);
  });
  return reviewList;
};
const updateAppReview = async (review) => {
  let docRef = doc(collection(db, 'review'), review.id);
  let temp = { ...review };
  delete temp.id;
  const updated = await updateDoc(docRef, {
    ...temp,
  });
  return updated;
};
// Delete Application Movie
const deleteAppReview = async (reviewID) => {
  let document = await doc(collection(db, 'review'), reviewID);
  await deleteDoc(document);
};
// Review
const getAppDiscount = async () => {
  let querySnapShot = await getDocs(collection(db, 'discount'));
  let reviewList = [];
  querySnapShot.forEach((doc) => {
    let review = {
      id: doc.id,
      title: doc.data().title,
      thumb: doc.data().thumb,
      content: doc.data().content,
      release: doc.data().release,
    };
    reviewList.push(review);
  });
  return reviewList;
};
const updateAppDiscount = async (discount) => {
  let docRef = doc(collection(db, 'discount'), discount.id);
  let temp = { ...discount };
  delete temp.id;
  const updated = await updateDoc(docRef, {
    ...temp,
  });
  return updated;
};
// Delete Application Movie
const deleteAppDiscount = async (discountID) => {
  let document = await doc(collection(db, 'discount'), discountID);
  await deleteDoc(document);
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

export {
  db,
  addNewComment,
  getComment,
  updateLike,
  getMovie,
  addMovie,
  getAppMovie,
  getAppReview,
  updateAppMovie,
  deleteAppMovie,
  deleteAppReview,
  updateAppReview,
  getAppDiscount,
  updateAppDiscount,
  deleteAppDiscount,
};
