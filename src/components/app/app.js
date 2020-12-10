import React, { Component } from 'react';
import { Spin, Alert } from 'antd';

import { Provider } from '../swapi-services-context'
import Main from '../main'
import MovieList from '../movie-list';
import SwapiServices from '../swapi-services/swapi-services';
import SearchMovie from '../search-movie';

import 'antd/dist/antd.css';
import './app.css';

export default class App extends Component {

	state = {
		movies: null,
		loading: true,
		error: false,
		searchValue: '',
		current: 1, 
		pages: null,
		rateMovies: [],
		show: null,
		genre: null,
	}

	componentDidMount() {
		this.getGenre();
		this.guestSession();
	}

	componentDidUpdate(prevProps, prevState) {
		const {searchValue, current} = this.state;
		if (!searchValue && prevState.searchValue !== searchValue) {
			return this.guestSession();
		} 
		if (current !== prevState.current) {
			this.getResult(current, searchValue);
		} else if (searchValue !== prevState.searchValue) {
			this.getResult(1, searchValue);
		}
	}

	swapiServices = new SwapiServices();

	onChange = page => {
	    this.setState({
	      	current: page,
	    });
	};

	showEdit = (value) => {
		this.setState(() => {
			return {
				show: value,
			}
		})
	}

	getGenre = () => {
		this.swapiServices.getGenre()
		.then((result) => {
			this.setState(() => {
				return {
					genre: result.genres
				}
			})
		})
	}

	rateChange = (id, value) => {
		const res = this.swapiServices.postData(id, value)
		this.setState(({movies, rateMovies}) => {
			const movie = movies.find(elem => elem.id === id);
			const movieValue = {...movie, value};
			const newData = rateMovies.filter(elem => elem.id !== id);
			return {
				rateMovies: [...newData, movieValue],
			}
		})
		
	}

	debounce = (fn, debounceTime) => {
	    let value;
	    return function() {
	        clearTimeout(value);
	        value = setTimeout(() => fn.apply(this, arguments), debounceTime);
	    }
	};

	onSearch = (event) => {
		this.setState(() => {
			return {
				searchValue: event.target.value.toLowerCase().trim(),
				current: 1,
			}
		})
	};



	onMovieLoaded = (result) => {
		this.setState(() => {
				return {
					movies: result.results,
					loading: false,
					pages: result.total_pages * 10,
				}

			})
	};

	onError = (error) => {
		this.setState(() => {
			return {
				error: true,
				loading: false
			}
		})
	};

	searchFilter = (value) => {
		const {movies} = this.state;
		const moviesFilter = movies.filter(elem => elem.title.toLowerCase().indexOf(value) != -1);

		return moviesFilter;	
	};

	guestSession() {
		const res = this.swapiServices.guestSession()
		.then(this.onMovieLoaded)
	}

	getResult(query, page) {
		const res = this.swapiServices.getDescription(query, page)
		.then(this.onMovieLoaded)
		.catch(this.onError);
	};

	render() {
		const {movies, loading, error, searchValue, current, pages, show, rateMovies, genre} = this.state;

		const hasData = !(error || loading);

		const searchMessage = !searchValue.trim() && show !== 'rated' ? 
		<div className="main__searchMessage">Пожалуйста, введите название фильма в поисковую строку.</div> : null

		const errorMessage = error ? 
		<Alert 
			message="Oops..." 
			description="Looks like something went wrong. We working on it." 
			type="error" showIcon /> : null;

		const spiner = loading ? 
		<div 
			className="main__spin">
		<Spin 
			tip="Loading ..." 
			size="large"/></div> : null;
		
		const content = hasData ? 
		<Main debounce={this.debounce} 
		show={show} 
		rateMovies={rateMovies} 
		onSearch={this.onSearch} 
		movies={movies}
		current={current} 
		onChange={this.onChange}
		pages={pages}
		rateChange={this.rateChange}
		searchMessage={searchMessage}
		showEdit={this.showEdit} />
		: null;

		return (
			<div className="main">
				<Provider value={genre}>
					{spiner}
					{content}
					{errorMessage}
				</Provider>
			</div>
		)
	}
}
