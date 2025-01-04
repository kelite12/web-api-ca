# Assignment 2 - Web API.

Name: Gao Yang

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + Many new API endpoints 
 + fully integrated
 + Several routes are protected


## Setup requirements.

[ NO ]

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

______________________
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb://localhost:27017/tasky_db
TMDB_KEY=*******
SECRET=ilikecake
______________________

## API Design
Give an overview of your web API design, perhaps similar to the following: 

- /api/movies | GET | Gets a list of movies 
- /api/movies/getMovie | POST | Gets a single movie 
- /api/movies/genres | GET | Get genres 
- /api/movies/getMovieImages | POST | get Movie Images  
- /api/movies/getMovieReviews | POST | get Movie Reviews
- /api/movies/getMoviePopular | GET | get Movie Popular
- /api/movies/getMovieRecommendations | POST | get Movie Recommendations
- /api/movies/getTrendingMovies | GET | get Trending Movies


## Security and Authentication

My backend has verified the identity of the received request, and only those that meet the identity will return information

## Integrating with React App

I used a series of methods such as API/Movies, and when the frontend needs data, it sends a request to the backend. After authentication, the backend will return the corresponding JSON data.
 
