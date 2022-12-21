const express =  require("express")
const router = express.Router()
const bookController = require('../contollers/books_controller')
const reviewController = require("../contollers/Review_Controllers")
const {verifyUser, verifyAdmin} =  require("../middleware/auth")


router.route("/")
    .get(bookController.getAllBooks)
    .post(verifyUser, bookController.createBook)
    .put((req, res) => {
      res.status(501).json({ reply: "Put Req not supported" });
    })
    .delete(verifyUser,verifyAdmin, bookController.deleteAllBooks);

router.use(verifyUser).route("/:id")
    .get(bookController.getBookById)
    .post((req, res) => {
      res.status(501).json({ reply: "Not implemented" });
    })
    .put(bookController.updateBookById)
    .delete(bookController.deleteBookById);
    
router.route('/:id/reviews')
    .get(reviewController.getAllReviews)
    .post(reviewController.createReview)
    .put((req,res )=>{
    res.status(501).json({reply: "Method not supported"})})
    .delete(reviewController.deleteReview)

router.route('/:id/reviews/:review_id')
    .get(reviewController.getReviewsById)
    .post((req, res) => {
        res.status(501).json({ reply: "Not implemented" });
    })
    .put(reviewController.updateReviewsById)
    .delete(reviewController.deletereviewbyId)

module.exports = router;



