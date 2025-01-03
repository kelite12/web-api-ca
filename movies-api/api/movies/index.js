import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import axios from 'axios';
import {
    getUpcomingMovies,
    getMovies,
} from '../tmdb-api';

const router = express.Router();

// TMDB API Key and Base URL
const TMDB_API_KEY = 'your_tmdb_api_key_here'; // 替换为你的 TMDB 密钥
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Get movies with pagination
// router.get('/', asyncHandler(async (req, res) => {
//     let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
//     [page, limit] = [+page, +limit]; // trick to convert to numeric (req.query will contain string values)

//     // Parallel execution of counting movies and getting movies using movieModel
//     const [total_results, results] = await Promise.all([
//         movieModel.estimatedDocumentCount(),
//         movieModel.find().limit(limit).skip((page - 1) * limit)
//     ]);
//     const total_pages = Math.ceil(total_results / limit); // Calculate total number of pages (= total No Docs/Number of docs per page) 

//     // Construct return Object and insert into response object
//     const returnObject = {
//         page,
//         total_pages,
//         total_results,
//         results
//     };
//     res.status(200).json(returnObject);
// }));

router.get('/', asyncHandler(async (req, res) => {
    const movies = await getMovies();
    res.status(200).json(movies);
}));


// Get movie details
router.get('/getmovie', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
    }
}));

// Get upcoming movies
router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

// Get movie genres from TMDB
router.get('/genres', asyncHandler(async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US' // Adjust language as needed
            },
        });

        const genres = response.data.genres;
        res.status(200).json({
            code: 200,
            msg: 'Genres fetched successfully',
            genres,
        });
    } catch (error) {
        console.error('Error fetching genres from TMDB:', error.message);
        res.status(500).json({
            code: 500,
            msg: 'Failed to fetch genres from TMDB',
            error: error.message,
        });
    }
}));

router.get('/genres', asyncHandler(async (req, res) => {
    const getGenres = await getUpcomingMovies();
    res.status(200).json(getGenres);
}));
router.get('/getMovieReviews', asyncHandler(async (req, res) => {
    const getMovieReviews = await getUpcomingMovies();
    res.status(200).json(getMovieReviews);
}));
router.get('/getMoviePopular', asyncHandler(async (req, res) => {
    const getMoviePopular = await getUpcomingMovies();
    res.status(200).json(getMoviePopular);
}));
router.get('/getTrendingMovies', asyncHandler(async (req, res) => {
    const getTrendingMovies = await getUpcomingMovies();
    res.status(200).json(getTrendingMovies);
}));
router.post('/getMovieImages', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }

        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
});
router.post('/getMovieRecommendations', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }

        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
});

export default router;
