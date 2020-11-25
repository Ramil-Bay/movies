import React, {Component} from 'react';

import MovieList from '../movie-list';

import SwapiServices from '../swapi-services/swapi-services';

export default class App extends Component {

	constructor() {
		super();
		this.getResult();
	}

	state = {
		movies: [{
			adult: false,
			backdrop_path: "/c3BQUy9AENkdd8us6OaB8GGBHc8.jpg",
			genre_ids: (4) [28, 12, 16, 14],
			id: 630656,
			original_language: "en",
			original_title: "The Death and Return of Superman",
			overview: "The Death of Superman and Reign of the Supermen now presented as an over two-hour unabridged and seamless animated feature. Witness the no-holds-barred battle between the Justice League and an unstoppable alien force known only as Doomsday, a battle that only Superman can finish and will forever change the face of Metropolis.",
			popularity: 157.753,
			poster_path: "/9BqeqvGfMOfsbY5X4mljLTVKO1X.jpg",
			release_date: "2019-10-01",
			title: "The Death and Return of Superman",
			video: true,
			vote_average: 6.8,
			vote_count: 500,
		},
		{
			adult: false,
			backdrop_path: "/cXnlomnqXZF8Lvcev5UAJgfx4gt.jpg",
			genre_ids: (4) [12, 16, 35, 10751],
			id: 615774,
			original_language: "en",
			original_title: "Scooby-Doo! Return to Zombie Island",
			overview: "Scooby-Doo and his pals win an all-expense paid vacation and embark on a trip of a lifetime to a tropical paradise. Their destination however, turns out to be Zombie Island. As soon as they arrive, they realize the place looks strangely familiar and is reminiscent of a trip they took years ago, in which they became wrapped up in a mystery involving zombies. The gang soon learns that their trip to paradise comes with a price when the zombies re-emerge and attack their hotel. Will Scooby-Doo and the Mystery Inc. gang finally solve the mystery behind Zombie Island?",
			popularity: 121.11,
			poster_path: "/vd0oIoWhEm8o7EpS0kV7RaV0Flf.jpg",
			release_date: "2019-10-01",
			title: "Scooby-Doo! Return to Zombie Island",
			video: false,
			vote_average: 7.1,
			vote_count: 318,
		}]
	}

	swapiServices = new SwapiServices();

	getResult() {
		const res = this.swapiServices.getDescription()
		.then((res) => {
			console.log(res[0]);
			this.setState(() => {
				return {
					movies: res
				}

			})
		})
	}

	render() {
		const {movies} = this.state;
		console.log(this.state.movies);
		return (
			<div className="main">
				<MovieList movies={this.state.movies}/>
			</div>
		)
	}
}