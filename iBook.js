// -----------LOGIN FETCH DATA FROM API----------------
// ----------Button with id myBt-------------
let username = document.getElementById("username");
let password = document.getElementById("password");

async function myBtn() {
  if (password.value !== "" && username.value !== "") {
    try {
      const arr = [];
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.value /*---kminchelle---*/,
          password: password.value /*---0lelplR---*/,
        }),
      });
      if (response.status !== 400) {
        console.log("success");
        window.location.href =
          "file:///C:/Trainee%20PF/social%20media%20app/iBook.html";
      } else {
        console.log("failed");
        alert("Incorrect password or email!");
      }

      arr.push({ token: `token is : ${token.value}` });
      arr.push({ email: `email is : ${email.value}` });
      arr.push({ username: `username is : ${username.value}` });
      localStorage.setItem("", JSON.stringify(arr));
    } catch (error) {
      console.log(error, "error");
    }
  } else {
    console.log("failed");
    alert("Please Enter Both field!");
  }
}

//  -------------------------LOG OUT---------------------------
function Logout() {
  let Logout = confirm("Do you really want to logout your id?");
  console.log(Logout);
}

// ----------------------Fetch Post with Comment--------------------------
// ----------------------------------------------------------
const feedz = document.getElementById("feeds");
console.log(feedz);
const commit = document.getElementById("feeds");
console.log(commit);

Post();
async function Post() {
  try {
    let postarray = [];
    const response = await fetch("https://dummyjson.com/posts");
    const response1 = await fetch("https://dummyjson.com/comments");

    console.log("chal raha");
    if (response.status !== 400) {
      console.log("success");
    } else {
      console.log("failed");
    }
    var post = await response.json();
    postarray = post.posts;
    console.log(postarray);

    var comment = await response1.json();
    comarray = comment.comments;
    console.log(comarray);

    for (let i = 0; i < postarray.length; i++) {
      var postss = `<div class="feed">
  <div class="head"></div>
   <div class="photo">
       <h1>Id # ${postarray[i].id}</h1>
       <h2>${postarray[i].title}</h2>
       <p>${postarray[i].body}</p>
       <p>${postarray[i].reaction}</p>
   </div>

   <div class="action-button">
       <div class="interaction-button">
           <span><i class="uil uil-thumbs-up"></i></span>
           <span><i class="uil uil-comment" onclick="Comment()" type="submit" value="Comment" ></i></span>
           <span><i class="uil uil-share"></i></span>
       </div>
       <div class="bookmark">
           <span><i class="uil uil-bookmark"></i></span>
       </div>
   </div>

   <div class="liked-by">
       <span><img src="main-img/austin-wade-d2s8NQ6WD24-unsplash.jpg"></span>
       <span><img src="main-img/pexels-abhishek-gaurav-829552.jpg"></span>
       <span><img src="main-img/pexels-ali-madad-sakhirani-1211588.jpg"></span>
       ,<p>Liked by <b>Abdul Rehman</b> and <b>220 others</b></p>
   </div>

   <div class="caption">
       <p><b>Ammar Zaidi</b>When you #Choose,Try to #Choose the Right One. ❤️
      <span class="hash-tag">#lifestyle</span></p>
   </div><br>
   
   <div class="comments text-muted">
 
   <h3>User Id # ${comarray[i].id}</h3>
   <h4>Comment :  ${comarray[i].body}</h4><br>
       <form onsubmit="event.preventDefault();" autocomplete="off">
         <div>
          <input type="text" name="fname" id="name"  placeholder="Write a Comment"> 
          <button type="button" class="postbtn" onclick="onFormSubmit()">Post</button>
         </div>
       </form>
     <td >
       <table class="list" id="employeeList">
       
       <th></th>
         <tbody>

         </tbody>
       </table>
  </td><br>
    View all 830 comments
   </div>
</div>`;

      var postcom = ``;
      feedz.innerHTML += postss;
      commit.innerHTML += postcom;
    
    }
  } catch (err) {
    console.log(err, "err");
  }
}


// ---------------------SEARCH USER POST---------------------------
// -------------------------------------------------------------
const searchbutton = document.getElementsByClassName("seabtn");
console.log(searchbutton);
const searchtext = document.getElementById("searchid");
console.log(searchtext);
document.addEventListener('click', searchesPost)
async function searchesPost() {
  try {
    let values = searchtext.value
    const response3 = await fetch(`https://dummyjson.com/posts/search?q=${values}`);
    console.log(values);
    console.log("chal raha");
    if (response3.status !== 400) {
      console.log("success");
    } else {
      console.log("failed");
    }
    let searcharray = await response3.json();
    console.log(searcharray);

    for (let i = 0; i < searcharray.posts.length; i++) {
      var searchcom = ``;
   
    searchtext.innerHTML += searchcom;
    }
  } catch (err) {
    console.log(err, "err");
  }
}




// -------------------CRUD FUNCTION FOR COMMENT----------------------
// ------------------------------------------------------------------
let employeeList = document.getElementById("employeeList");
function onFormSubmit() {
  var formData = readFormData();
  if (selectedRow == null) insertNewRecord(formData);
  else updateRecord(formData);
  resetForm();
}
var selectedRow = null;
function readFormData() {
  var formData = {};
  formData["name"] = document.getElementById("name").value;
  return formData;
}
function insertNewRecord(data) {
  var table = document
    .getElementById("employeeList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.name;

  cell4 = newRow.insertCell(1);
  cell4.innerHTML = `<button onClick="onEdit(this)" class="crud">Edit</button><br>
                     <button onClick="onDelete(this)" class="crud">Delete</button>`;
}

function resetForm() {
  document.getElementById("name").value = "";
  selectedRow = null;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("name").value = selectedRow.cells[0].innerHTML;
}
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.name;
}

function onDelete(td) {
  if (confirm("Are you sure to delete this record ?")) {
    row = td.parentElement.parentElement;
    document.getElementById("employeeList").deleteRow(row.rowIndex);
    resetForm();
  }
}

// ---------------------------------------------------------------------
// --------------------------------------------------------------------
//-------------------Left sidebar Notifications and messages and search-------
const menuItems = document.querySelectorAll(".menu-item");
const messagesNotification = document.querySelector("#messages-notifications");
const messages = document.querySelector(".messages");
const message = messages.querySelectorAll(".message");
const messageSearch = document.querySelector("#message-search");

//remove active class from all menu items
const changeActiveItem = () => {
  menuItems.forEach((item) => {
    item.classList.remove("active");
  });
};

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    changeActiveItem();
    item.classList.add("active");
    if (item.id != "notifications") {
      document.querySelector(".notifications-popup").style.display = "none";
    } else {
      document.querySelector(".notifications-popup").style.display = "block";
      document.querySelector(
        "#notifications .notification-count"
      ).style.display = "none";
    }
  });
});

// -----------messages-----------
// -----------searches-------chat----------
const searchMessage = () => {
  const val = messageSearch.value.toLowerCase();
  message.forEach((chat) => {
    let name = chat.querySelector("h5").textContent.toLowerCase();
    if (name.indexOf(val) != -1) {
      chat.style.display = "flex";
    } else {
      chat.style.display = "none";
    }
  });
};

// --------Search chat-------------

messageSearch.addEventListener("keyup", searchMessage);

// -----------------Highlight messages card when message menu click-------------
messagesNotification.addEventListener("click", () => {
  messages.style.boxShadow = "0 0 1rem var(--color-primary)";
  messagesNotification.querySelector(".notification-count").style.display =
    "none";
  setTimeout(() => {
    messages.style.boxShadow = "none";
  }, 3000);
});
