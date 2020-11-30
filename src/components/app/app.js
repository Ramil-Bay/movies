import React, { Component } from 'react';
import { Spin, Alert } from 'antd';

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
	}

	componentDidMount() {
		this.getResult(1);
	}

	componentDidUpdate(prevProps, prevState) {
		const {searchValue, current} = this.state;
		if (current !== prevState.current) {
			this.getResult(current, searchValue);
			console.log(this.state.searchValue);
			console.log('update');
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

	debounce = (fn, debounceTime) => {
	    let value;
	    return function() {
	        clearTimeout(value);
	        value = setTimeout(() => fn.apply(this, arguments), debounceTime);
	    }
	};

	onSearch = (event) => {
		console.log(event.target.value.toLowerCase().trim())
		this.setState(() => {
			return {
				searchValue: event.target.value.toLowerCase().trim(),
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

	getResult(query, page) {
		const res = this.swapiServices.getDescription(query, page)
		.then(this.onMovieLoaded)
		.catch(this.onError);
	};

	render() {
		const {movies, loading, error, searchValue, current, pages} = this.state;

		const hasData = !(error || loading);

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
		onSearch={this.onSearch} 
		movies={movies}
		current={current} 
		onChange={this.onChange}
		pages={pages} />
		: null;

		return (
			<div className="main">
				
				{spiner}
				{content}
				{errorMessage}
			</div>
		)
	}
}
