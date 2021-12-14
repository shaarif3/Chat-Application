// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"
import { getFirestore, collection, addDoc, doc, getDoc, getDocs,setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlb7_ArxvyHR2od7TSkizpsln7VYXhqic",
  authDomain: "learning-cool.firebaseapp.com",
  projectId: "learning-cool",
  storageBucket: "learning-cool.appspot.com",
  messagingSenderId: "1085554141933",
  appId: "1:1085554141933:web:fb2b6808724a522b2cfae4",
  measurementId: "G-NR68Y9M2FW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();
let email = document.getElementById('email');
let password = document.getElementById('password');
let age = document.getElementById('age');
let username = document.getElementById('username');
let register = document.getElementById('register')
let login = document.getElementById("Login")
let logout = document.getElementById("logout");
let inputName = document.getElementById("inputname");
let search = document.getElementById("search")
if (register === null) {
} else {
  register.onclick = function () {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        let dbRef = doc(db,"users",userCredential.user.uid);
        setDoc(dbRef,{name:username.value, email:email.value,age:age.value})
      .then((data)=>{
        alert("register successfull")
        window.location = "home.html";
        email.value = " ";
        password.value = " ";
        age.value = "";
        username.value = '';
      })
      .catch((error)=>{
        console.log(error)
      })


        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }
}


if (login === null) {
} else {
  login.onclick = function () {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        window.location = "home.html"
        // ... 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}

if (logout === null) {
}
else {
  logout.onclick = function () {
    signOut(auth)
      .then((data) => {
        window.location = "login.html"
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

let userName = document.getElementById("username");

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user, 'user active!')
    let dbRef = doc(db,"users",user.uid)
    getDoc(dbRef)
    .then((data)=>{
      // console.log(data.data().name)
      userName.innerHTML = `Welcome ${data.data().name} `;
    })
    .catch((error)=>{
      console.log(error)
    })

  }
  else {
    console.log("no user found")
  }
})

search.onclick = function(){
 var userName = inputName.value;
//  console.log(userName)
 let dbref = collection(db,"users");
 getDocs(dbref)

 .then((data)=>{
   data.forEach(function(kuchbhi){
    //  console.log(kuchbhi.data().name);
if(kuchbhi.data().name === userName){
  console.log(kuchbhi.data())
}
else{
  console.log("person not found")
}
   })
console.log(data)
 })
 .catch((error)=>{
   console.log(error)

 })

}



console.log()