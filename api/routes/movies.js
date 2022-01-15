const router = require('express').Router();
const Movie = require('../models/Movie');
const verify = require('../verifyToken');

//CREATE
router.post('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const newMovie = new Movie(req.body);
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } catch (err) {
            res.status(500).json(err)
        }

    } else {
        res.status(403).json('You are not allowed to create movie');
    }
});

//UPDATE
router.put('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updateMovie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updateMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).jason('You are not allowed to update movie');
    }
});

//DELETE
router.delete('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json('The movie has been deleted');
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You are not allowed to delete movie');
    }
});

//GET
router.get('/find/:id', verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET RANDOM
//http://localhost:8800/api/movies/random?type=series 
router.get('/random', verify, async (req, res) => {
    const type = req.query.type;
    // const type = req.query.random;
    let movie;
    try {
        if (type === 'series') {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } }
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ]);
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL
router.get('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse());
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You are not allowed to get all movies');
    }
});

module.exports = router;