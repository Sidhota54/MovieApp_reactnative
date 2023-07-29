import axios from "axios";
import {apiKey} from '../constants/index';

//endpoint
const apiBaseUrl =  'https://api.themoviedb.org/3';
const trandingMoviesEndpoint  = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint  = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topratedMoviesEndpoint  = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}` 
const searchmoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`


export const image500 =(path) => path ?  `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 =(path) => path ?  `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 =(path) => path ?  `https://image.tmdb.org/t/p/w185/${path}` : null;

export const moviesDetailsEndpoint =(id) => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}` ;
export const moviesCreditsEndpoint =(id) => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}` ;
export const moviesSimilarEndpoint =(id) => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}` ;



export const persionDetailsEndpoint =(id) => `${apiBaseUrl}/person/${id}?api_key=${apiKey}` ;
export const persionMoviesEndpoint =(id) => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}` ;







export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

const apiCall = async (endpoint,params) =>{
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params: {}
    }
    try{
        const response = await axios.request(options);
        return response.data
    }
    catch(error){
        console.log('error',error);
        return {}
    }
}


//Home Screen
export const fetchTrandingMovies = () => {
    return apiCall(trandingMoviesEndpoint);
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies = () => {
    return apiCall(topratedMoviesEndpoint);
}

//Movie Screen
export const fetchMovieDetails = (id) => {
    return apiCall(moviesDetailsEndpoint(id));
}
export const fetchMovieCredits = (id) => {
    return apiCall(moviesCreditsEndpoint(id));
}
export const fetchSimilarMovies = (id) => {
    return apiCall(moviesSimilarEndpoint(id));
}

//person Screen

export const fetchPersonDetails = (id) => {
    return apiCall(persionDetailsEndpoint(id));
}
export const fetchPersonMovies = (id) => {
    return apiCall(persionMoviesEndpoint(id));
}

//Search Screen

export const fetchSearchMovies = (params) => {
    return apiCall(searchmoviesEndpoint,params);
}



