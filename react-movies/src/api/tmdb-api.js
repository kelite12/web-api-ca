export const getMovies = async () => {
  const response = await fetch(
    'http://localhost:8080/api/movies', {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};


// export const getMovie = async ( queryKey ) => {
//   console.log(queryKey)
//   const [, { id }] = queryKey.queryKey;
//   console.log(id)
//   const response = await fetch(
//     `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
//   );
//   return response.json();
// };

export const getMovie = async ({queryKey}) => {
  const response = await fetch('http://localhost:8080/api/movies/getMovie', {
  headers: {
    'Content-Type': 'application/json', // 添加 Content-Type
  'Authorization': window.localStorage.getItem('token')
  },
  method: 'post',
  body: JSON.stringify({ args:queryKey })
  });
  return response.json();
  };

export const getGenres = async () => {
  const response = await fetch(
   'http://localhost:8080/api/movies/genres', {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
});
  return response.json();
};

export const getMovieImages = async ({ queryKey }) => {
  const response = await fetch('http://localhost:8080/api/movies/getMovieImages', {
  headers: {
    'Content-Type': 'application/json', // 添加 Content-Type
  'Authorization': window.localStorage.getItem('token')
  },
  method: 'post',
  body: JSON.stringify({ args:queryKey })
  });
  return response.json();
};

export const getMovieReviews = async ({ queryKey }) => {
  const response = await fetch('http://localhost:8080/api/movies/getMovieReviews', {
  headers: {
    'Content-Type': 'application/json', // 添加 Content-Type
  'Authorization': window.localStorage.getItem('token')
  },
  method: 'post',
  body: JSON.stringify({ args:queryKey })
  });
  return response.json();
};

export const getMoviePopular = async () => {
  const response = await fetch(
    'http://localhost:8080/api/movies/getMoviePopular', {
     headers: {
       'Authorization': window.localStorage.getItem('token')
     }
 });
   return response.json();
};

export const getMovieRecommendations = async (id) => {
  const response = await fetch('http://localhost:8080/api/movies/getMovieRecommendations', {
    headers: {
      'Content-Type': 'application/json', // 添加 Content-Type
    'Authorization': window.localStorage.getItem('token')
    },
    method: 'post',
    body: JSON.stringify({ args:id })
    });
    return response.json();
};

export const getTrendingMovies = async () => {
  const response = await fetch(
    'http://localhost:8080/api/movies/getTrendingMovies', {
     headers: {
       'Authorization': window.localStorage.getItem('token')
     }
 });
   return response.json();
};
