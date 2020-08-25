const API_URL = "";
const postsArea = document.querySelector("#posts");
const authorInput = document.querySelector("#authorInput");
const messageInput = document.querySelector("#messageInput");
const postButton = document.querySelector("#postBtn");

const post_new = () => {
  let author = authorInput.value;
  let message = messageInput.value;
  if (author.length > 2 && message.length > 2) {
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        author: author,
        message: message,
        date: new Date().toUTCString(),
      }),
    }).then((response) => {
      location.reload();
    });
  } else {
    postButton.value = "MESSAGE OR NAME TOO SMALL";
  }
};
postButton.addEventListener("click", post_new);

const displayPosts = (data) => {
  data = data.reverse();
  for (postData of data) {
    let post = document.createElement("div");
    post.id = "post";
    let message = document.createElement("p");
    message.innerText = postData["message"];
    post.appendChild(message);
    let authorName = document.createElement("h4");
    authorName.innerText = postData["author"];
    post.appendChild(authorName);
    postsArea.appendChild(post);
    let date = document.createElement("h5");
    date.innerText = postData["date"];
    post.appendChild(date);
    postsArea.appendChild(post);
  }
};

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => displayPosts(data));
