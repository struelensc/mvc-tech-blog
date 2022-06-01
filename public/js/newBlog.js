const newBlogHandler = async (event) => {
  const title = document.querySelector("#newBlogTitle").value;
  const content = document.querySelector("#newBlogContent").value;

  console.log(title);

  if (title && content) {
    const response = await fetch("/api/dashboard", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#newBlogPost")
  .addEventListener("submit", newBlogHandler);
