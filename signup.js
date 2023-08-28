
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged,setDoc,doc,
    getFirestore,collection, addDoc, } from "./firebase.js"
// import{allBlog}from "./allblog.js"

    const db = getFirestore(); 
    const auth = getAuth();
let signupName = document.getElementById("signup-name")
let signupEmail = document.getElementById("signup-email")
let signupPassword = document.getElementById("signup-password")
let signupBtn = document.getElementById("signup-btn")
let usreDataBaseId = localStorage.getItem ("usersId")
console.log(usreDataBaseId)

let signup = () => {
    console.log(signupName.value)
    console.log(signupEmail.value)
    console.log(signupPassword.value)
let userSignupData ={
    signup_name_value:signupName.value,
    signup_email_value:signupEmail.value,
    signup_password_value:signupPassword.value
}
   
createUserWithEmailAndPassword(auth, userSignupData.signup_email_value,  userSignupData.signup_password_value)
  .then(async(userCredential) => {
    const user = userCredential.user;
  //  allBlog(user.uid)
    
// Add a new document in collection "cities"
await setDoc(doc(db, "users", user.uid), {
  ...userSignupData,
        userId:user.uid     
      });

      localStorage.setItem("usersId",user.uid )
      // localStorage.setItem("usersId","hello" )
     let usreDataBaseId = localStorage.getItem ("usersId");
    if(usreDataBaseId){
    location.href = "./profile.html"
}

// try {
//     const docRef = await addDoc(collection(db, "users"), {
//    ...userSignupData,
//       userId:user.uid     

//     });
//     console.log("Document written with ID: ", docRef.id);
//     localStorage.setItem("usersId",docRef.id )
//     loginlocal(docRef.id)
//     console.log(user)
//      let usreDataBaseId = localStorage.getItem ("usersId")
//     if(usreDataBaseId){
//     location.href = "./profile.html"
// }
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
//     console.log(user)
     

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
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