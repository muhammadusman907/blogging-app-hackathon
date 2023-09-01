
import {
  getStorage, ref, uploadBytesResumable, getDownloadURL,
  getFirestore, collection, addDoc, doc, updateDoc, onSnapshot, arrayUnion, getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword
} from "./firebase.js"
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();
let profileFileImage = document.getElementById("profile-image-file");
let profileImageBtn = document.getElementById("profile-image-btn");
let profileName = document.getElementById("profile-name")
let profileImage = document.getElementById("profile-image");
let iconBtn = document.getElementById("icon-btn");
let navProfileName = document.getElementById("nav-profile-name");
let logoutBtn = document.getElementById("logout-btn");
let updatePasswordBtn = document.getElementById("update-password-btn");
let updateEmail = document.getElementById("update-email");
let oldPassword = document.getElementById("old-password");
let newPassword = document.getElementById("new-password");

let callUpdatePassword = async() => {
  if (oldPassword.value.trim() == "" ){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "required old password",
    })
  }
    else if(newPassword.value.trim() == ""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Required new password",
      })
    }
    else{
  try{
    const data = await userUpdatePassword()
    console.log(data) 
       Swal.fire({
      icon: 'success',
      title: 'Oops...',
      text : "update sucscessfully",
    
    })
  }
  catch (error){
    console.log(error)
    Swal.fire({
      icon: 'success',
      title: 'Oops...',
      text: error,
    })
  }}
}

let userUpdatePassword = () => {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser;
    console.log("current user", user)
    const credential = EmailAuthProvider.credential(updateEmail.value, oldPassword.value)
    reauthenticateWithCredential(user, credential).then((res) => {
      resolve(res)
      console.log("userauth finished", res)
      updatePassword(user, newPassword.value).then((res) => {
        resolve(res)
        // console.log(res)
      }).catch((error) => {
        reject(error)
        // console.log("update password", error)
      });
    }).catch((error) => {
      reject(error)
      // console.log("error", error.massage)
    });
  })
}
updatePasswordBtn.addEventListener("click", callUpdatePassword)

let logout = () => {
  signOut(auth).then(() => {
    localStorage.clear()
    location.href = "./signup.html"
  }).catch((error) => {
    console.log("error")
  });
}
logoutBtn.addEventListener("click", logout)
let iconBtns = () => {
  profileFileImage.click();
}
iconBtn.addEventListener("click", iconBtns)
let imageupdate = () => {
  const unsub = onSnapshot(doc(db, "users", localStorage.getItem("usersId")), (doc) => {
    profileName.innerHTML = doc.data().signup_name_value;
    profileImage.src = doc.data().photoUrl;
    navProfileName.innerHTML = doc.data().signup_name_value;
    updateEmail.value = doc.data().signup_email_value;
    console.log("Current data: ", doc.data());

  });

};

imageupdate()
let profileUpdateImage = () => {
  console.log("hee")
  console.log(profileFileImage.files[0].name)
  updateProfile(URL.createObjectURL(profileFileImage.files[0]))
    .then(async (res) => {
      console.log(res)
      const washingtonRef = doc(db, "users", localStorage.getItem("usersId"));

      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        photoUrl: res
      });
      profileImage.src = res;
    }
    )
    .catch(rep => console.log(rep))

}
let updateProfile = (file) => {
  return new Promise((resolve, reject) => {

    console.log(file.name)
    const storageRef = ref(storage, `images${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {

        reject(error)
      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          resolve(downloadURL)
        });
      }
    );
  })

}

profileImageBtn.addEventListener("click", profileUpdateImage);