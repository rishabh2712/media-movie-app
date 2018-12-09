import {DataService} from './services/Dataservices'
import {Jawbone}  from "./common/Jawbone";
import {MovieCard}  from './common/Moviecard'
import '../styles/main.scss'
import { debounce } from 'lodash/debounce';


class App  {
    constructor() {
        this.dataService = new DataService()
        this.jawbone = new Jawbone()
        this.moviecard = new MovieCard()
        this.page = 1, this.searchPage = 1, this.state, this.polling = false, this.sort_by=''
    }

    init = () => {
        this.settings = {
            section: document.getElementsByTagName('section'),
            searchSection: document.getElementById('search'),
            //sortOption: document.getElementById('sort-option'),
            nowPlayingSection: document.getElementById('now-playing'),
            navLinks: document.querySelectorAll('nav a'),
            content: document.getElementsByClassName('mdl-layout__content')[0],
            searchInput: document.getElementById('search-input'),
            loader: document.getElementsByClassName('loader')[0],
            drawer: document.querySelector('.mdl-layout__drawer'),
            sortOption: document.getElementById("sort_option"),
            obfuscator: ''
        }
        this.dataService.getLatestMovies()
        this.storeGenresLocally()
        this.bindUIActions()
        console.log(this);
        
    }

    bindUIActions = () => {
        window.addEventListener('load', this.router())
        window.addEventListener('hashchange', this.router())
        // We choose to close all open jawbones on window resize
        window.addEventListener('resize', () => {
            this.closeJawbone(this.state);
        });

        // Infinite scrolling
        Array.from(this.settings.section, (section) => {
            section.addEventListener('scroll', () => {
                var reachedBottom = section.scrollHeight - section.scrollTop === section.clientHeight;
                if (reachedBottom && !this.polling && section.scrollTop > section.clientHeight) {
                    if (this.state === 'now-playing') {
                        this.page++;    
                        this.getLatestMovies(this.page);
                    }
                    else if (this.state === 'search') {
                        this.searchPage++;
                        this.searchMovies(this.settings.searchInput.value, this.searchPage);
                    }
                }
            });
        })
        
        this.settings.searchInput.addEventListener('keyup', (e) => {
            this.clearSearchResults();
            if (this.settings.searchInput.value.length > 0 && !this.polling) {
                this.searchMovies(this.settings.searchInput.value);
            }
        });

        // Close drawer on selecting a menu item
        Array.from(this.settings.navLinks, (navLink) => {
            navLink.addEventListener('click',  () => {
                debugger
                // Obfuscator is lazy loaded by Material Lite, so we can only catch it here
                var obfuscator = document.querySelector('.mdl-layout__obfuscator');
                this.settings.drawer.classList.remove('is-visible');
                obfuscator.classList.remove('is-visible');
                this.router()
            })
        })
    }


    storeGenresLocally = () => {
        this.dataService.getGenres().then((data) => {
            data.genres.map((genreObj) => {
                localStorage.setItem(genreObj.id, genreObj.name);
            })
        })
    }


    dropdown = () => {
        let sortOptions  = [
            {
                id: 1,
                displayName: 'Release date',
                option: 'release_date.desc',
            },
            {
                id: 2,
                displayName: 'Title',
                option: 'original_title.asc'
            }
        ]
        sortOptions.forEach(sort => {
          const { displayName, option } = sort;
          const optionDiv = document.createElement("li");
          optionDiv.addEventListener("click", () => this.selectOption(sort));
          optionDiv.appendChild(document.createTextNode(sort.displayName))
          optionDiv.classList.add("mdl-menu__item")
          this.settings.sortOption.appendChild(optionDiv);
          return optionDiv
        });    
    }

    selectOption = (sort) => {
        console.log(sort);
        
        this.getLatestMovies(this.page, sort.option)
    }

    router = () =>  {
        this.state = location.hash.slice(1) || '/';
        // Hide all sections
        Array.from(this.settings.section, (el) => {
            el.style.display = 'none';
        });
        // Remove 'is-active' class from all navigation links
        Array.from(this.settings.navLinks, (navLink)  =>{
            navLink.classList.remove('is-active');
        });
        // Manage states
        
        switch (this.state) {
            case 'now-playing':
                if (this.settings.nowPlayingSection.querySelectorAll('.movie-card').length === 1) {
                    this.getLatestMovies();
                }   
            // Intentional fallthrough
            case 'search':
                document.getElementById(this.state).style.display = 'flex';
                Array.from(document.querySelectorAll('nav a[href="#' + this.state + '"]'), (navLink) => {
                    navLink.classList.add('is-active');
                });
                break;
            default:
                window.location.hash = '#now-playing';
        }
    }
     closeJawbone = (state) => {
        Array.from(this.settings.section, (section) => {
            // If a jawbone already exists, remove it
            if (section.querySelector('.js-jawbone.is-open')) {
                section.querySelector('.js-jawbone.is-open').parentNode.removeChild(section.querySelector('.js-jawbone.is-open'));
            }
        });
    }

    clearSearchResults = () => {
        var movieCards = this.settings.searchSection.getElementsByClassName('movie-card');
        var jawbones = this.settings.searchSection.getElementsByClassName('jawbone');
        Array.from(movieCards).map((card, i) =>{
            if (i > 0) {
                this.settings.searchSection.removeChild(card);
            }
        });
        Array.from(jawbones).map((jawbone, i) => {
            if (i > 0) {
                this.settings.searchSection.removeChild(jawbone);
            }
        });
    }

    getLatestMovies = (page, sort) => {
        this.toggleLoader();
        this.dataService.getLatestMovies(page, sort).then((data)  => {
            this.toggleLoader();
            this.loadMovies(data);
        })
            .catch((err) => {
                console.log('Error:' + err);
            });
    }

    // Load movies, building from templates
    loadMovies = (data) => {
        data.results.map((movie) => {
            this.moviecard  
                .create(this.state, movie)
                .addEventListener('click', (e) => {
                    if (window.innerWidth > 479) {
                        this.toggleActiveCard(this.state, e);
                        this.showJawbone(movie.id, e);
                    }
                });
        });
    }

    // Logic for the search page. Typically this would go to its own file
    searchMovies = (searchText, page) => {
        this.toggleLoader();
        this.dataService.getSearchResults(searchText, page).then((data) => {
            this.loadMovies(data);
            this.toggleLoader();
        })
        .catch((err) => {
            console.log('Error:' + err);
        });
    }

    // Clear search results on keystroke

    // Show jawbone
    showJawbone = (movieId, e) => { 
        this.toggleLoader();
        this.dataService.getMovieDetails(movieId)
            .then((data) => {
                this.toggleLoader();
                this.jawbone.create(this.state, data, e);
                e.target.scrollIntoView({
                    behavior: 'smooth'
                });
            })
            .catch((err) => {
                console.log('Error:' + err);
            });
    }

    // Close Jawbone
    closeJawbone = (state) => {
        Array.from(this.settings.section,  (section) => {
            // If a jawbone already exists, remove it
            if (section.querySelector('.js-jawbone.is-open')) {
                section.querySelector('.js-jawbone.is-open').parentNode.removeChild(section.querySelector('.js-jawbone.is-open'));
            }
        });
    }

    // Loader helper
    toggleLoader = () =>  {
        this.polling = !this.polling;
        this.settings.loader.style.visibility = this.polling ? 'visible' : 'hidden';
    }

    // Toggle active card:
    // Remove .is-active class from current active card and added to the one just clicked
    toggleActiveCard(state, e) {
        //Toggle active state for movie cards
        var activeCard = document.getElementById(this.state).querySelector('.movie-card.is-active');
        if (activeCard) {
            activeCard.classList.remove('is-active');
        }
        e.target.closest('.movie-card').classList.add('is-active');
    }

}

const app = new App();

window.addEventListener('load', () => app.init());