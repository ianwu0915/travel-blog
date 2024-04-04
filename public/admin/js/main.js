async function getPosts() {
  return await fetch("http://localhost:3000/posts").then((response) =>
    response.json()
  );
  // .then((data) => data);
}

async function getCallBackRequests() {
  return await fetch("http://localhost:3000/callback-requests").then((response) =>
    response.json()
  );
  // .then((data) => data);
}

document.addEventListener("DOMContentLoaded", async function () {
  addPosts();
  addCallBackRequests();

  let addPostBtn = document.querySelector(".add-post");
  let createPostBtn = document.querySelector("#v-pills-add-post-tab");

  addPostBtn.addEventListener("click", () => createPostBtn.click());
});

async function addPosts() {
  let posts = await getPosts();

  // Query the first table body in the document
  let articles = document.querySelector(".articles-list tbody");
  articles.innerHTML = "";
  let i = 1;
  posts.forEach((post) => {
    let postHTML = `
        <tr>
            <td>${i++}<input class="id" type = "hidden" value=${post.id}></td>
            <td class="title">${post.title}</td>
            <td class="date">${post.date}</td>
            <td class="country">${post.country}</td>
            <td><button class="edit-btn btn btn-link p-0 text-decoration-none">Edit</button></td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>
        `;
    articles.insertAdjacentHTML("beforeend", postHTML);
  });
}

async function addCallBackRequests() {
  let requests = await getCallBackRequests();
  let requestsBlock = document.querySelector("#v-pills-requests tbody");
  requestsBlock.innerHTML = "";
  let i = 1;
  requests.forEach((request) => {
    let requestHTML = `
        <tr>
            <td>${i++}<input class="id" type = "hidden" value=${request.id}></td>
            <td class="phoneNumber">${request.phoneNumber}</td>
            <td class="date">${request.date}</td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>
        `;
      requestsBlock.insertAdjacentHTML("beforeend", requestHTML);
  });
}

let requestsBlock = document.querySelector("#v-pills-requests")
requestsBlock.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
        let id = e.target.parentNode.parentNode.querySelector(".id").value;
        console.log(id);
        fetch('http://localhost:3000/callback-requests/' + id, {
            method: "DELETE"
        }).then((response) => response.text())
        .then((data) => window.history.go());
    }
})
