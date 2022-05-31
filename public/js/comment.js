const commentFormHandler = async (event) => {
  event.preventDefault();
  const comment = document.querySelector("#newComment").value.trim();
  const blog_id =
    window.location.href.split("/")[window.location.href.split("/").length - 1];

  if (comment) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment, blog_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.redirected) {
      document.location = response.url;
      return;
    } else if (response.status === 200) {
      location.reload();
    } else {
      alert("Failed to create comment");
    }
  }
};

document
  .querySelector("#commentForm")
  .addEventListener("submit", commentFormHandler);
