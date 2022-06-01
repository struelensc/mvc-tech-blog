// Handler for deleting an existing blog post
const deleteBlog = async (event) => {
  const id = event.path[2].children[0].dataset.id;

  if (id) {
    const response = await fetch(`/api/dashboard/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

let dbutton = document.querySelectorAll(".deleteBlog");
dbutton.forEach((button) => {
  button.addEventListener("click", deleteBlog);
});
