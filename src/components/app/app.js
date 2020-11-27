import React, {Component} from 'react';
import {Spin, Alert} from 'antd';

import MovieList from '../movie-list';
import SwapiServices from '../swapi-services/swapi-services';

import 'antd/dist/antd.css';
import './app.css';

export default class App extends Component {

	constructor() {
		super();
		this.getResult();
	}

	state = {
		movies: null,
		loading: true,
		error: false,
	}

	swapiServices = new SwapiServices();

	onMovieLoaded = (movies) => {
		this.setState(() => {
				return {
					movies: movies,
					loading: false
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
	}

	getResult() {
		const res = this.swapiServices.getDescription()
		.then(this.onMovieLoaded)
		.catch(this.onError);
	}

	render() {
		const {movies, loading, error} = this.state;

		const hasData = !(error || loading);

		const errorMessage = error ? <div className="Test"><Alert message="Oops..." description="Looks like something went wrong. We working on it." type="error" showIcon /></div> : null;
		const spiner = loading ? <div className="main__spin"><Spin tip="Loading ..." size="large"/></div> : null;
		const content = hasData ? <MovieList movies={movies} /> : null;

		return (
			<div className="main">
				{spiner}
				{content}
				{errorMessage}
			</div>
		)
	}
}