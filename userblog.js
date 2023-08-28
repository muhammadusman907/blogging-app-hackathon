import{onSnapshot,doc,getFirestore,collection, query, where,}from "./firebase.js" 
let singleUserList = document.getElementById("single-user-list")
let userProfileEmail = document.getElementById("single-user-email")
let userProfileName = document.getElementById("single-user-name")
let userProfilePhoto = document.getElementById("user-profile-photo")
const db = getFirestore();
export{singleUser}
let singleUser = (e) =>{
    console.log(e)
    localStorage.setItem("profileId", e)
    
    location.href = "./userblog.html";
       
} 

const singleUsergetData = ()=>{
    if (location.pathname == "/userblog.html"){ const q = query(collection(db, "blogs"), where("currentuserid", "==", localStorage.getItem("profileId")));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            userProfilePhoto.src = change.doc.data().imageUrl;
            userProfileEmail.innerHTML = change.doc.data().userName;
            userProfileName.innerHTML = change.doc.data().userEmail;
            singleUserList.innerHTML +=`
            <div class="all-blog-main " >
            <div class="allblog-image-name-parent">
            <div class="allblog-image mt-2 ms-2"><img src="${change.doc.data().imageUrl}" alt=""> </div>
            <div class="allblog-user-name mt-3" ><h2 class="ps-2 fs-5">${change.doc.data().userName}</h2>
            <span class="ps-2 fs-6">${change.doc.data().userName}</span>
            <span>12-12-2024</span>
            </div>
            </div>
            <div class="all-blog-value mt-2">
            <div class="allblog-user-name mt-4" ><h2 class="fs-4 ps-3 pe-2">${change.doc.data().blogTittleValue}</h2>
            <p class="pt-3 ps-3 pe-2"> ${change.doc.data().blogValue}</p>
            </div>
            </div>
           
            `
            console.log(change.doc.data())
        });
    });
  
} 
} 
singleUsergetData()




window.singleUser = singleUser ;
