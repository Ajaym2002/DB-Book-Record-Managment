const express = require("express");
const {UserModel , BookModel} = require("../modals");
const {getAllBooks, getAllBooksByID, getAllIssuedBooks, addNewBook, updateBookById, currentlyAvailable} = require("../controllers/book-controller");


const router = express.Router();

router.get("/",getAllBooks);

router.get("/id", getAllBooksByID);

router.get("/issued-books",getAllIssuedBooks );

router.post("/", addNewBook);

router.put("/id", updateBookById);

// api I built
// need to change the route to /currently-available
router.get("/", currentlyAvailable);


module.exports = router;