const router = require("express").Router();
const { Blog, User } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all blogs
router.get("/", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const userBlogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("dashboard", { userBlogs });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new blog post
router.post("/", withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(500).json(error);
  }
});

// Update an existing blog post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const editBlog = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!editBlog) {
      res
        .status(404)
        .json({ message: `No post found with id ${req.params.id}` });
    }

    res.status(200).json(editBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete an existing blog post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res
        .status(404)
        .json({ message: `No post found with id ${req.params.id}` });
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
