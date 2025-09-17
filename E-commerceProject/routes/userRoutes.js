const express = require("express");
const { getAllUsers, updateUser, deleteUser } = require("../controllers/userController");
const { authenticate, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticate, isAdmin, getAllUsers);


router.put("/:id", authenticate, isAdmin, updateUser);
router.delete("/:id", authenticate, isAdmin, deleteUser);

module.exports = router;
