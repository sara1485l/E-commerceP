const express = require("express");
const { getAllUsers, updateUser, deleteUser ,uploadProfileImage,updateUserRole}= require("../controllers/userController");   

const { authenticate, isAdmin } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", authenticate, isAdmin, getAllUsers);


router.put("/:id", authenticate, isAdmin, updateUser);
router.delete("/:id", authenticate, isAdmin, deleteUser);

router.put("/:id/upload", authenticate, upload.single("image"), uploadProfileImage); 
router.put("/:id/role", authenticate, isAdmin, updateUserRole);                      

module.exports = router;



