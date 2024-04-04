async function getPosts() {
  return await fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((data) => data);
}

let callmeForm = document.querySelector(".call-me-form");

document.addEventListener("DOMContentLoaded", async function () {
  let posts = await getPosts();
  console.log(posts);
  let articles = document.querySelector(".landmarks");
  articles.innerHTML = "";
  posts.forEach((post) => {
    let postHTML = `
        <div class="col">
            <div class="card">
                <img src="${post.imageURL}" class="card-img-top" alt="${post.title}">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.description}</p>
                    <button class="btn btn-primary">Details</button>
                </div>
            </div>
        </div>
        `;
    articles.insertAdjacentHTML("beforeend", postHTML);
  });
});

callmeForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let phoneInput = callmeForm.querySelector("input");
  fetch("http://localhost:3000/callback-requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phoneNumber: phoneInput.value,
    }),
  })
    .then((resp) => resp.text())
    .then(() => alert("We will call you back as soon as possible!"));
});
