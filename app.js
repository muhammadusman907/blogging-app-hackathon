import {serverTimestamp,Timestamp, signOut, deleteDoc, getAuth, onAuthStateChanged, initializeApp, getFirestore, collection, addDoc, updateDoc, onSnapshot, setDoc, arrayUnion, arrayRemove, query, where,doc ,getDocs} from "./firebase.js"
export { blogFunc }
const db = getFirestore();
const auth = getAuth();
// const app = initializeApp();
let blog = document.getElementById("blog")
let blogTittle = document.getElementById("blog-tittle")
let blogBtn = document.getElementById("blog-btn");
let blogList = document.getElementById("blog-list")
let logoutBtn = document.getElementById("logout-btn");
let dashBoardNavName = document.getElementById("dashb-nav-name");
let dashboardEdit = document.getElementById("dashboard-show");
let blogBtnCancel = document.getElementById("blog-btn-cancel");
let updateBtnBlog = document.getElementById ("blog-update-btn")
let updateBlogInput = document.getElementById ("update-blog")
let updateBlogTittleInput = document.getElementById ("update-blog-tittle")
let spiner = document.getElementById("spiner");
let date = new Date() ; 
// spiner.style.display = "none";
// console.log(updateBlogInput)
// console.log(updateBlogTittleInput)
let logout = () => {
    signOut(auth).then(() => {
        localStorage.clear()
        location.href = "./signup.html"
    }).catch((error) => {
        console.log("error")
    });

}
logoutBtn && logoutBtn.addEventListener("click", logout)
if (location.pathname == "/index.html") {
    // alert("filled")
    // debugger
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(user)

        } else {
            if (location.pathname !== "/login.html") {
                location.href = "./login.html"
            }
        }
    });
    
}     
var blogFunc = async (value) => {
    const unsub = onSnapshot(doc(db, "users", localStorage.getItem("usersId")), async (docs) => {
        console.log("Current data: ", docs.data());
        console.log(value)
        if (blog.value.trim() === "") {
            alert(" 2 input khali")
        }
        else if (blogTittle.value.trim() === "") {
            alert("1 input ")
        }
        else {
            console.log(docs.data().photoUrl)
            console.log(blog.value)
            console.log(blogTittle.value)
            let date = new Date();
            let userUpadadeData = {
                blogValue: blog.value,
                blogTittleValue: blogTittle.value,
                imageUrl: docs.data().photoUrl,
                userName: docs.data().signup_name_value,
                currentuserid: docs.data().userId,
                userEmail:docs.data().signup_email_value,
                dates: serverTimestamp()
            }
        
            const docRef = await addDoc(collection(db, "blogs"), {
                ...userUpadadeData,

            });
            console.log("Document written with ID: ", docRef.id);
            localStorage.setItem("blogsId", docRef.id)

            const washingtonRef = doc(db, "blogs", localStorage.getItem("blogsId") );
            // Set the "capital" field of the city 'DC'
            await updateDoc(washingtonRef, {
                blogeid: docRef.id
            });
    blog.value = "";
    blogTittle.value = "";
    blogGetData()
        }
    });
   
}
blogBtn && blogBtn.addEventListener("click", blogFunc);
if (location.pathname === "/index.html"){
    var blogGetData = async() => {
        blogList.innerHTML = "";
        const q = query(collection(db, "blogs"), where("currentuserid", "==", localStorage.getItem("usersId")));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            spiner.style.display = "none";
            console.log(doc.id, " => ", doc.data());
            dashBoardNavName.innerHTML = doc.data().userName;
            console.log(doc.data().dates.nanoseconds ) ;
        
                        blogList.innerHTML += `
                    
                        <div class="blog-show">
                        
                        <div class="pic-tittle ">
                        <div class="blog-profile-pic mt-2 ms-3">
                        <img id="blog-page-image" src="${doc.data().imageUrl}" alt="">
                        </div>
                        <div>
                        <div class="name-tittle ms-3">
                        <h3 id="show-blog-tittle" class="pt-3">${doc.data().userName}</h3>
                 <span id="show-name">${doc.data().userName}</span>
                 <span>${doc.data().dates.toDate().toDateString() }</span>
                 <div>
                 </div>
                 </div>
                 </div>
                 </div>
                 <div class="blog-value-btn ms-3 me-4 mb-1">
                 <input style="display:none;" type="text"  placeholder="Whats on your Mind">
                 <h3 id="show-blog-tittle" class="fs-4">${doc.data().blogTittleValue}</h3>
                 <p id="show-blog" class="mb-3">${doc.data().blogValue}</p>
                 <button class="update-delete" onclick="editBlog(this,'${doc.data().blogeid}')">Edit</button>
                 <button class="update-delete" onclick="deleteBlog(this,'${doc.data().blogeid}')">Delete</button>
                 <button class="update-delete invisible" onclick="updateBlog(this,'${doc.data().blogeid}')">Update</button>
                 </div>
                 </div>  
                 `
        });
        console.log("hello")

    }
    blogGetData()
}
    

let deleteBlog = async(e,deleteId) => {

    await deleteDoc(doc(db, "blogs", deleteId));
    console.log(deleteId)
    blogGetData()
}
let editBlog = async (e,editId) => {
    localStorage.setItem("editId",editId)
    dashboardEdit.style.display = "block" ;
    dashboardEdit.style.position = "fixed" ;
    dashboardEdit.style.left = "30%" ;
    dashboardEdit.style.bottom = "30%" ;
    // console.log(e.parentNode.parentNode.childNodes[3].childNodes[1])
    // e.parentNode.parentNode.childNodes[3].childNodes[1].style.display = "block";

}
let closeModal = ( ) =>{
    dashboardEdit.style.display = "none" ;
}
blogBtnCancel && blogBtnCancel.addEventListener("click",closeModal)

// e.parentNode.parentNode.childNodes[1].childNodes[1].style.display = "none";
// let blog = e.parentNode.parentNode.childNodes[1].childNodes[1];
let updateBlog = async (e,updateId) => {
   console.log(updateId)

   console.log("my func")
  let editId =  localStorage.getItem ("editId");
 console.log(updateBlogInput.value) 
 console.log(updateBlogTittleInput.value) 
//   console.log(blog.value)
  const washingtonRef = doc(db, "blogs", editId);

  await updateDoc(washingtonRef, {
      blogValue : updateBlogInput.value,
      blogTittleValue : updateBlogTittleInput.value
    });
    dashboardEdit.style.display = "none" ;
    
   blogGetData()
}
updateBtnBlog && updateBtnBlog.addEventListener("click",updateBlog)

window.deleteBlog = deleteBlog;
window.editBlog = editBlog;
// window.updateBlog = updateBlog;
