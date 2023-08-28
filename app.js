import { signOut, getAuth, onAuthStateChanged, initializeApp, getFirestore, collection, addDoc, updateDoc, onSnapshot, setDoc, arrayUnion, arrayRemove, query, where,doc } from "./firebase.js"
export { blogFunc }
const db = getFirestore();
const auth = getAuth();
// const app = initializeApp();
let blog = document.getElementById("blog")
let blogTittle = document.getElementById("blog-tittle")
let blogBtn = document.getElementById("blog-btn");
let blogList = document.getElementById("blog-list")
let logoutBtn = document.getElementById("logout-btn");
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

        // blogFunc(doc.data())
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
            let userUpadadeData = {
                blogValue: blog.value,
                blogTittleValue: blogTittle.value,
                imageUrl: docs.data().photoUrl,
                userName: docs.data().signup_name_value,
                currentuserid: docs.data().userId,
                userEmail:docs.data().signup_email_value
                // usreid: d

                // photourl:e
            }
            // update doc function

            // Add a new document with a generated id.
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
// Add a new document in collection "cities"
// await setDoc(doc(db, "users", localStorage.getItem("usersId")), {
//    ...userUpadadeData,
   
//   });
        }
    });
}
blogBtn && blogBtn.addEventListener("click", blogFunc);



if (location.pathname == "/index.html") {
    let blogGetData = () => {
        //)
        const q = query(collection(db, "blogs"), where("currentuserid", "==", localStorage.getItem("usersId")));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {

                console.log(change.doc.data())

                blogList.innerHTML += `
         <div>
         <div class="blog-show">

             <div class="pic-tittle ">
                 <input style="display:none;" type="text">
                 <div class="blog-profile-pic mt-2 ms-3">
                     <img id="blog-page-image" src="${change.doc.data().imageUrl}" alt="">
                 </div>
                 <div>
                     <div class="name-tittle ps-2">
                         <h3 id="show-blog-tittle">${change.doc.data().blogTittleValue}</h3>
                         <span id="show-name">${change.doc.data().userName}</span>
                         <span>12-2-2024</span>
                         <div>
                         </div>
                     </div>
                 </div>
             </div>
                 <div class="blog-value-btn mt-5">
                     <p id="show-blog">${change.doc.data().blogValue}</p>
                     <button class="btn btn-success" onclick="editBlog(this)">Edit</button>
                     <button class="btn btn-success" onclick="deleteBlog(this)">Delete</button>
                     <button class="btn btn-success" onclick="updateBlog(this)">Update</button>
                 </div>
         `
            });
        });
    }
    blogGetData();
}


let deleteBlog = (e) => {


    console.log(e)
}
let editBlog = async (e) => {
    e.parentNode.parentNode.childNodes[1].childNodes[1].style.display = "block";
    console.log(e.parentNode.parentNode.childNodes[1].childNodes[1])

}
let updateBlog = async (e) => {


    e.parentNode.parentNode.childNodes[1].childNodes[1].style.display = "none";
    let blog = e.parentNode.parentNode.childNodes[1].childNodes[1];
    console.log(blog.value)
    // console.log()
    const washingtonRef = doc(db, "users", localStorage.getItem("usersId"));
    await updateDoc(washingtonRef, {

    });

    //   Atomically remove a region from the "regions" array field.

    // console.log(e)
}


window.deleteBlog = deleteBlog;
window.editBlog = editBlog;
window.updateBlog = updateBlog;
