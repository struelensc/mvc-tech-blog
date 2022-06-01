const editBlogHandler = async (id) => {
  const title = document.querySelector("#editedBlogTitle").value;
  const content = document.querySelector("#editedBlogContent").value;

  if (title && content && id) {
    const response = await fetch(`/api/dashboard/${id}`, {
      method: "PUT",
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

let ebtn = document.querySelectorAll(".editBlogBtn");
ebtn.forEach((button) => {
  let id = button.parentElement.previousElementSibling.dataset.id;
  button.addEventListener("click", () => {
    document
      .querySelector("#editBlog")
      .addEventListener("submit", () => editBlogHandler(id));
  });
});
