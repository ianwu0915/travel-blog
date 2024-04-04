{
    let articlesBlock = document.querySelector(".articles-list")
    let updateBtn = document.querySelector("#v-pills-update-post-tab")
    let updateForm = document.querySelector(".update-post-form")
    
    let titleInput = document.querySelector("#update-title")
    let textInput = document.querySelector("#update-text")
    let id;

    articlesBlock.addEventListener("click", async function (e) {
        if (e.target.classList.contains("edit-btn")) {
            id = e.target.parentNode.parentNode.querySelector(".id").value;
            let postInfo = await fetch("http://localhost:3000/posts/" + id)
                .then((response) => response.json())
                .then((data) => data)
            updateBtn.click();
            titleInput.value = postInfo.title;
            textInput.value = postInfo.text;
        }
    })

    updateForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let updateDescription;
        if (textInput.value.indexOf(".") === -1) {
            updateDescription = textInput.value;
        } else {
            updateDescription = textInput.value.substring(0, textInput.value.indexOf(".") + 1);
        }

        fetch("http://localhost:3000/posts/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: titleInput.value,
                text: textInput.value,
                description: updateDescription,
            }),
        }).then((response) => response.text()).then((data) => window.history.go());
    })
}