const router = require("express").Router();
const { Blog, User } = require("../../models");
const withAuth = require("../../utils/auth");

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

module.exports = router;
