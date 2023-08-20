const express = require("express");
const {UserModel, BookModel} = require("../modals");
const {getAllUsers, getSingleUserById, createNewUser, updateUserById, deleteUser, getSubscriptionDetailsById} = require("../controllers/user-controller.js");
const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getSingleUserById);

router.post("/", createNewUser);

router.put("/:id", updateUserById);

router.delete("/:id", deleteUser);

router.get("/:id", getSubscriptionDetailsById);

module.exports = router;