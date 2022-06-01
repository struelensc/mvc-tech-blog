const router = require("express").Router();

const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");
const dashboardRoutes = require("./dashboardRoutes");

router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
