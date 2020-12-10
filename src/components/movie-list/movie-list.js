import React from 'react';
import PropTypes from 'prop-types';

import Movie from '../movie';

import './movie-list.css';

const MovieList = ({movies, rateChange, showEdit}) => {

	const cards = movies.map((elem) => {
		return(
			<li className="card" key={elem.id}>
				<Movie {...elem}
				rateChange={(id, value) => rateChange(id, value)} />	
			</li>
		)
	})
	return (
		<ul className="main__list">
			{cards}
		</ul>
	)
}

MovieList.defaultProps = {
	movies: [{
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

MovieList.propTypes = {
	movies: PropTypes.arrayOf(PropTypes.object)
}


export default MovieList;