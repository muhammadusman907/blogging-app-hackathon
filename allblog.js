
//============================= firebase.js import ===================== //
import { getFirestore, collection, query, where, onSnapshot, doc } from "./firebase.js"
import { singleUser } from "./userblog.js";
const db = getFirestore();
//-------------------------------------------------------------------- //
// ----------------------------- global ids get ----------------------- //
//--------------------------------------------------------------------- //
let singleUserSelect = document.getElementById("single-select");
let allBlogList = document.getElementById("all-blog-list");
let spiner = document.getElementById("spiner");

//==================================================================== //
// ------------------------------all blog show----------------------------------//
// ====================================================================//
let allBlog = () => {

    //=======================user id get local storage========================== //
    let sigleDoc = localStorage.getItem("blogsId");

    //================= user data get fire store fire base ================= //
           //================= real time data get  ================= //
        const q = query(collection(db, "blogs"), where("currentuserid", "!=", sigleDoc));
        const unsubscribe = onSnapshot(q, (snapshot) => {
           spiner.style.display = "none";
            snapshot.docChanges().forEach((change) => {

                if (location.pathname == "/allblog.html") {
                    allBlogList.innerHTML += `
                        <div class="all-blog-main" >
                        <div class="allblog-image-name-parent ">
                        
                        <div class="allblog-image mt-2"><img src="${change.doc.data().imageUrl}" alt=""> </div>
                      <div class="allblog-user-name mt-4 ps-3" >
                      <h2 class=" fs-4">${change.doc.data().userName}</h2>
                        <span class="fs-6">${change.doc.data().userName}</span>
                        <span>12-12-2024</span>
                        </div>
                        </div>
                        <div class="all-blog-value ">
                        <h2 class="fs-5">${change.doc.data().blogTittleValue}</h2>
                        <p class=""> ${change.doc.data().blogValue}</p>
                        <button class="user-btn pb-4" onclick="singleUser('${change.doc.data().currentuserid}')" id="single-select">see all this user</button>
                        </div>
                        </div>
        `
                    console.log(change.doc.data())
                }
            });
        });
}

allBlog()
