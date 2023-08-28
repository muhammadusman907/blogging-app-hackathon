
import {getStorage, ref ,uploadBytesResumable, getDownloadURL,
    getFirestore,collection, addDoc ,doc, updateDoc ,onSnapshot,arrayUnion
}from "./firebase.js"

import { blogFunc } from "./app.js";
const storage = getStorage();
const db = getFirestore();
let profileFileImage = document.getElementById("profile-image-file"); 
let profileImageBtn = document.getElementById("profile-image-btn"); 
let profileName = document.getElementById("profile-name")
 let profileImage = document.getElementById("profile-image");
 let iconBtn = document.getElementById("icon-btn");
 let iconBtns = ()=>{
    profileFileImage.click();
 }
 iconBtn.addEventListener("click",iconBtns)
  let imageupdate = ()=>{
const unsub = onSnapshot(doc(db, "users", localStorage.getItem("usersId")), (doc) => {
   profileName.innerHTML = doc.data().signup_name_value
    profileImage.src = doc.data().photoUrl;
    console.log("Current data: ", doc.data());
  

});

  };

  imageupdate()
let profileUpdateImage =  ()=>{ 
    console.log("hee")
    console.log(profileFileImage.files[0].name)
    updateProfile(profileFileImage.files[0])
    .then(async(res)=>{console.log(res)
      const washingtonRef = doc(db, "users", localStorage.getItem("usersId"));
      
      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        photoUrl:res
      });
      profileImage.src = res;
}
    )
.catch(rep=>console.log(rep))

    }
let updateProfile = (file) =>{
    return new Promise ((resolve,reject)=>{
      
    console.log(file.name)
    const storageRef = ref(storage, `images${file}`);
    
    const uploadTask = uploadBytesResumable(storageRef,file);
    
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

profileImageBtn.addEventListener("click" ,profileUpdateImage);