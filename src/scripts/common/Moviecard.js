
export class MovieCard {
    constructor() {

    }

    create = (state, movie, index) => {    
        let section, movieCard, clone
        section = document.getElementById(state)
        movieCard = section.getElementsByClassName('movie-card')[0];
        clone = section.appendChild(movieCard.cloneNode(true));
        // clone.setAttribute('data-id', movie.id); //TODO: Do I need this?
        clone.querySelector('.movie-card__title').textContent = movie.title;
        clone.querySelector('.movie-card__overview').textContent = movie.overview;
        clone.querySelector('.movie-card__genres').textContent = this.getGenres(movie.genre_ids);
        clone.querySelector('.movie-card__meta__year').textContent = movie.release_date.substring(0, 4);
        clone.querySelector('.movie-card__meta__rating').textContent = movie.vote_average + '/10';
        clone.style.backgroundImage = movie.poster_path ? 'url(http://image.tmdb.org/t/p/w300' + movie.poster_path + ')' : 'url(http://lorempixel.com/300/450/nightlife/)';
        clone.style.display = 'flex';
        return clone;
    }

    getGenres = (genresArr) => {
        return genresArr.map((genreId) => {
            return ' ' + localStorage[genreId];
        })
    }
}