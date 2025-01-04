import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import axios from 'axios';
import {
    getUpcomingMovies,
    getMovies,
    getGenres,
    getMovieReviews,
    getMoviePopular,
    getTrendingMovies,
    getMovie,
    getMovieRecommendations,
    getMovieImages,
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
router.post("/getMovie", asyncHandler(async (req, res) => {
    const { args } = req.body; // Extract args from request body
    try {
    const movie = await getMovie(args);
    res.status(200).json(movie);
    } catch (error) {
    res.status(500).json({
    message: error.message || "Failed to fetch movie.",
    status_code: 500,
    });
    }
    })
);

// Get upcoming movies
// router.get('/upcoming', asyncHandler(async (req, res) => {
//     const upcomingMovies = await getUpcomingMovies();
//     res.status(200).json(upcomingMovies);
// }));

// Get movie genres from TMDB
// router.get('/genres', asyncHandler(async (req, res) => {
//     try {
//         const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
//             params: {
//                 api_key: TMDB_API_KEY,
//                 language: 'en-US' // Adjust language as needed
//             },
//         });

//         const genres = response.data.genres;
//         res.status(200).json({
//             code: 200,
//             msg: 'Genres fetched successfully',
//             genres,
//         });
//     } catch (error) {
//         console.error('Error fetching genres from TMDB:', error.message);
//         res.status(500).json({
//             code: 500,
//             msg: 'Failed to fetch genres from TMDB',
//             error: error.message,
//         });
//     }
// }));

router.get('/genres', asyncHandler(async (req, res) => {
    const Genres = await getGenres();
    res.status(200).json(Genres);
}));
router.get('/getMoviePopular', asyncHandler(async (req, res) => {
    const MoviePopular = await getMoviePopular();
    res.status(200).json(MoviePopular);
}));
router.get('/getTrendingMovies', asyncHandler(async (req, res) => {
    const TrendingMovies = await getTrendingMovies();
    res.status(200).json(TrendingMovies);
}));

router.post("/getMovieImages", asyncHandler(async (req, res) => {
    const { args } = req.body; // Extract args from request body
    try {
    const movie = await getMovieImages(args);
    res.status(200).json(movie);
    } catch (error) {
    res.status(500).json({
    message: error.message || "Failed to fetch movie.",
    status_code: 500,
    });
    }
    })
);

router.post("/getMovieRecommendations", asyncHandler(async (req, res) => {
    const { args } = req.body; // Extract args from request body
    try {
    const movie = await getMovieRecommendations(args);
    res.status(200).json(movie);
    } catch (error) {
    res.status(500).json({
    message: error.message || "Failed to fetch movie.",
    status_code: 500,
    });
    }
    })
);

router.post("/getMovieReviews", asyncHandler(async (req, res) => {
    const { args } = req.body; // Extract args from request body
    try {
    const movie = await getMovieReviews(args);
    res.status(200).json(movie);
    } catch (error) {
    res.status(500).json({
    message: error.message || "Failed to fetch movie.",
    status_code: 500,
    });
    }
    })
);

export default router;
