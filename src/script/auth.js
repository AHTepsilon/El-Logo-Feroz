import React, {Component, useState} from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import {app, auth, db, storage} from '../firebase/firebase'
import { doc, setDoc, updateDoc, collection, getDoc, getDocs } from "firebase/firestore"; 
import {getStorage, ref, getDownloadURL, uploadBytes} from 'firebase/storage'
const GoogleProvider = new GoogleAuthProvider();

let userId = '';
let userData = '';

export async function sendUserToDatabase(userData) {
  await getDoc(doc(db, 'users', auth.currentUser.uid)).then(docSnap => {
    if(!docSnap.exists()){
      try{
        setDoc(doc(db, "users", auth.currentUser.uid), userData);
        alert("User created");
      }
      catch(error){
        console.log(error);
      }
    }
    else{
      return false;
    }
  })

}

export async function logIn(provider){
    if(provider == 'google'){
        signInWithPopup(auth, GoogleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            const newUser = {
                'email': user.email,
                'id': user.uid,
            }
            
            sendUserToDatabase(newUser)
            
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
}

export function logOut(){
    signOut(auth).then(() => {
        alert('Saliste exitosamente')
      }).catch((error) => {
        console.error(error);
      });
}

export async function userExists(){
  getDoc(doc(db, 'users', auth.currentUser.uid)).then(docSnap => {
    if(docSnap.exists()){
      return true;
    }
    else{
      return false;
    }
  })

  
}

export async function validateUser(){
    await onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          userId = uid
          console.log(userId);
        } else {
          // User is signed out
          // ...
        }
      });
}

export async function updateUserData(userData) {
    try{
        validateUser()
        await updateDoc(doc(db, "users", auth.currentUser.uid), userData);
      }

      catch(error){
        console.log(error);
      }
}

export async function uploadImage(toRef, file) {
  const storageRef = ref(storage, toRef);

  uploadBytes(storageRef, file).then((snapshot) => {
    console.log(file)
  })
}

export async function uploadOtherData(toRef, file){
  const storageRef = ref(storage, toRef);
  
  uploadBytes(`files/${auth.currentUser.uid}/${file}`, file).then((snapshot) => {
    console.log(file)
  })
}

export async function getImage(toRef, file){
  setTimeout(() => {
    validateUser();
    getDownloadURL(ref(storage, `images/${toRef}/${auth.currentUser.uid}/${file}`))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
  
      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();

      console.log(url)

      return url;
    })
    .catch((error) => {
      // Handle any errors
    });
    
  },2000)
}

export async function getRequestsById(id){
  let requests = [];
  
  const querySnapshot = await getDocs(collection(db, 'requests'));
  querySnapshot.forEach((doc) => {
    requests.push(doc.data());
  });

  console.log(requests);

  let filteredRequests = requests.filter((item) => id === item.id)
  return filteredRequests ? filteredRequests[0] : null
}