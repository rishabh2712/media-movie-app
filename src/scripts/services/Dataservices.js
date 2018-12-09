const API_KEY = 'bc50218d91157b1ba4f142ef7baaa6a0';

export class DataService {
   
    getLatestMovies = (page, sort) => {
        page = page || 1;
        var url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY + '&page=' + page + '&sort_by=' + sort;
        return fetch(url)
            .then(response => response.json());
    }
    getSearchResults = (searchText, page) => {
        page = page || 1;
        var url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=' + searchText + '&page=' + page;
        return fetch(url)
            .then(response => response.json());
    }

    getMovieDetails = (movieId) => {
        var url = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + API_KEY + '&append_to_response=trailers,reviews,similar';
        return fetch(url)
            .then(response => response.json())
    }

    getGenres = () => {
        var url = 'https://api.themoviedb.org/3/genre/movie/list' + '?api_key=' + API_KEY;
        return fetch(url)
            .then(response => response.json())
    }
}