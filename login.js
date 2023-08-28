import { getAuth, signInWithEmailAndPassword, onAuthStateChanged,setDoc,doc ,getFirestore,updateDoc} from "./firebase.js"
export { loginlocal }
const db = getFirestore();
const auth = getAuth();
let loginEmail = document.getElementById("login-email");
let loginPassword = document.getElementById("login-password");
let loginBtn = document.getElementById("login-btn");
let loginlocal = (localstoreid) => {
  console.log(localstoreid)
}
loginlocal()
let login = () => {
  console.log(loginEmail.value)
  console.log(loginPassword.value)
  let userLoginData = {
    login_email_value: loginEmail.value,
    login_password_value: loginPassword.value,
    
  }

  signInWithEmailAndPassword(auth, userLoginData.login_email_value, userLoginData.login_password_value)
    .then(async (userCredential) => {
      //  ADD DOC LOGIN
      const user = userCredential.user;
      // await setDoc(doc(db, "users", user.uid), {
      //   ...userLoginData,
      //   userId: user.uid
      // });
      // localStorage.setItem("usersId", user.uid)
      // let usreDataBaseId = localStorage.getItem("usersId")
      // if (usreDataBaseId) {
      //   location.href = "./profile.html"
      // }
      // console.log(user)
      const washingtonRef = doc(db, "users", user.uid);

      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        ...userLoginData,
          userId: user.uid
      });
         localStorage.setItem("usersId", user.uid)
      let usreDataBaseId = localStorage.getItem("usersId")
      if (usreDataBaseId) {
        location.href = "./profile.html"}
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("login error", errorMessage)
    });

}
let usreDataBaseId = localStorage.getItem("usersId")
onAuthStateChanged(auth, (user) => {
  if (user && usreDataBaseId) {
    location.href = "./profile.html"
    const uid = user.uid;

  } else {
    if(location.pathname !== "/login.html"){
    location.href = "./login.html"}
  }
});
if (location.pathname == "/login.html")
  loginBtn.addEventListener("click", login)

