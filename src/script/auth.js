import React, {Component, useState} from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import {app, auth, db} from '../firebase/firebase'
import { doc, setDoc, updateDoc, collection, getDoc } from "firebase/firestore"; 

const GoogleProvider = new GoogleAuthProvider();

let userId = '';
let userData = '';

export function logIn(provider){
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
  let docRef = doc(db, "users", userData.id);

  docRef.get().then((doc) => {
    if(doc.exists){
      return(true);
    }
    else{
      return(false);
    }
  })
}

export async function validateUser(){
    await onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          userId = uid
          console.log(userId);
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
}

export async function sendUserToDatabase(userData) {
  if(!userExists){
    try{
      await setDoc(doc(db, "users", userData.id), userData);
      alert("User created");
    }

    catch(error){
      console.log(error);
    }
  }
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