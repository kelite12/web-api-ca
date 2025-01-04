import fetch from 'node-fetch';

export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getGenres = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMoviePopular = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getTrendingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovie = async ( queryKey ) => {
    try {
    const [, { id }] = queryKey;
    console.log(id)
    const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
    );

    if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch movie details.");
    } 
    return await response.json();
    } catch (error) {
    console.error("Error fetching movie details:", error.message);
    throw error;
    }
};

export const getMovieImages = async ( queryKey ) => {
    try {
    const [, { id }] = queryKey;
    console.log(id)
    const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
    );

    if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch movie details.");
    } 
    return await response.json();
    } catch (error) {
    console.error("Error fetching movie details:", error.message);
    throw error;
    }
};

export const getMovieRecommendations = async ( id ) => {
    try {
    console.log(id)
    const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_KEY}`
    );

    if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch movie details.");
    } 
    return await response.json();
    } catch (error) {
    console.error("Error fetching movie details:", error.message);
    throw error;
    }
};

export const getMovieReviews = async ( queryKey ) => {
    try {
    const [, { id }] = queryKey;
    console.log(id)
    const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
    );

    if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch movie details.");
    } 
    return await response.json();
    } catch (error) {
    console.error("Error fetching movie details:", error.message);
    throw error;
    }
};