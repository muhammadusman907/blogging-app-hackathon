// ============ import firebase.js ========//
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged,setDoc,doc,
    getFirestore,collection, addDoc, } from "./firebase.js"

    const db = getFirestore(); 
    const auth = getAuth();
    // ======== get ids sign.html ====//
let signupName = document.getElementById("signup-name")
let signupEmail = document.getElementById("signup-email")
let signupPassword = document.getElementById("signup-password")
let signupBtn = document.getElementById("signup-btn")
let usreDataBaseId = localStorage.getItem ("usersId")
let spiner = document.getElementById("spiner");
spiner.style.display = "none";
console.log(usreDataBaseId)

// =========== signup button =======//
let signup = () => {
    console.log(signupName.value)
    console.log(signupEmail.value)
    console.log(signupPassword.value)
    spiner.style.display = "flex";
let userSignupData ={
    signup_name_value:signupName.value,
    signup_email_value:signupEmail.value,
    signup_password_value:signupPassword.value
}
   
createUserWithEmailAndPassword(auth, userSignupData.signup_email_value,  userSignupData.signup_password_value)
.then(async(userCredential) => {
    const user = userCredential.user;
    spiner.style.display = "none";
      // ================sweet alert ============== //
      Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text: "signup successfully",
      });
  
      // =========== add docs user data store fire base  ============ //
await setDoc(doc(db, "users", user.uid), {
        ...userSignupData,
        userId:user.uid     
      });
   
      localStorage.setItem("usersId",user.uid )
     let usreDataBaseId = localStorage.getItem ("usersId");
    if(usreDataBaseId){
    location.href = "./profile.html"
}
  })
  .catch((error) => {
    spiner.style.display = "none";
const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  // ================sweet alert ============== //
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: errorMessage,
  })
  });

 
}
// let usreDataBaseId = localStorage.getItem ("usersId")
 console.log(usreDataBaseId)
 onAuthStateChanged(auth, (user) => {
    console.log(user)
    if (user && usreDataBaseId) {
        location.href = "./profile.html"
      const uid = user.uid;
      console.log(uid)
  
    } else {
  
    }
  });
signupBtn.addEventListener("click",signup)