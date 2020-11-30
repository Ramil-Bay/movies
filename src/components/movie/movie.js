import React, {Component} from 'react';

import SwapiServices from '../swapi-services/swapi-services';

import './movie.css'

export default class Movie extends Component {
	trimParagraph = (overview) => {
		if(overview.length > 200) {
			const trimOveriew = overview.slice(0, 200);
			const lastSpace = trimOveriew.lastIndexOf(' ');
			return `${trimOveriew.slice(0, lastSpace)}...`
		} return overview
	}

	render() {
		const { overview, poster_path, title, release_date } = this.props;
		const date = new Date(release_date);
		const dateArr = String(date).split(' ', 4);
		const trimOveriew = this.trimParagraph(overview);
		return(
				<div className="card__container">
					
						<img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className="card__img" alt="Sorry, we didn't find this picture." />

					<div>
						<h3 className="card__title">{title}</h3>
						<span className="card__date">{`${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`}</span>
						<div>
							<button></button>
							<button></button>
						</div>
						<p className="card__paragraph">{trimOveriew}</p>
					</div>
				</div>
		)
	}
}