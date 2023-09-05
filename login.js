  //  ===================== firebase.js =================//
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged,setDoc,doc ,getFirestore,updateDoc} from "./firebase.js"
// export { loginlocal }
const db = getFirestore();
const auth = getAuth();
// ========================================================//
// ======================global ids get====================//
// ========================================================//
let loginEmail = document.getElementById("login-email");
let loginPassword = document.getElementById("login-password");
let loginBtn = document.getElementById("login-btn");
let spiner = document.getElementById("spiner");

// ==============spiner display none========//
spiner.style.display = "none"
// ==================********//

// let loginlocal = (localstoreid) => {
//   console.log(localstoreid)
// }
// loginlocal()

// ======================================================//
// ==========================login button================//
// ======================================================//
let login = () => {

  spiner.style.display = "flex"
  //==============> console.log(loginEmail.value)
  //==============> console.log(loginPassword.value)
    
  let userLoginData = {
    login_email_value: loginEmail.value,
    login_password_value: loginPassword.value,
    
  }
// ====================== singin method fire base ===========// 
  signInWithEmailAndPassword(auth, userLoginData.login_email_value, userLoginData.login_password_value)
    .then(async (userCredential) => {
      const user = userCredential.user;
      // =========== sweet alert ========//
      Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text:"Login succseeFully",
      })
      // =============== add docs add data =========// 
      const washingtonRef = doc(db, "users", user.uid);
      await updateDoc(washingtonRef, {
        ...userLoginData,
          userId: user.uid
      });
      //  ============= localStorage set userid ============ // 
         localStorage.setItem("usersId", user.uid)

      //  ============= localStorage get userid ============ // 
      let usreDataBaseId = localStorage.getItem("usersId")
      //  ========== condition user data add if local storage user =========// 
      if (usreDataBaseId) {
        location.href = "./profile.html"}
    })
    // ==================== user error wrong,email,password ========//
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      spiner.style.display = "none";
      // ================sweet alert ============== //
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      })
    });

}
// ======================== current user======================= //
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

