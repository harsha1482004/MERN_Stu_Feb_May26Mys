// Handles req related to movie
const express =require("express");
const {authMiddleware}=require("../middleware/authMiddleware");
const {
    getHome,
    getAllMovies,
    getMovieById,
    addMovie,
    udpateMovie,
    deleteMovie
} = require("../controllers/movieController");
const roleMiddleware=require("../middleware/roleMiddleware");

const router=express.Router();

// Sends requests to home page
router.get("/",getHome);
// Sends requests to get all movies
router.get("/movies",getAllMovies);
// Sends requests to  movies based on Id
router.get("/movies/:id",getMovieById);

router.post("/movies",authMiddleware,roleMiddleware("admin"),addMovie);  //Creates a new movie 
router.put("/movies/:id",authMiddleware,roleMiddleware("admin"),udpateMovie);   //Update Movie detail/s
router.delete("movies/:id",authMiddleware,roleMiddleware("admin"),deleteMovie); //Delete a movie

module.exports=router;