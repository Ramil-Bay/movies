import React, {Component} from 'react';
import { Rate } from 'antd'

import { Consumer } from '../swapi-services-context';
import SwapiServices from '../swapi-services/swapi-services';

import './movie.css'

export default class Movie extends Component {
	trimParagraph = (overview, amount) => {
		if(overview.length > amount) {
			const trimOveriew = overview.slice(0, amount);
			const lastSpace = trimOveriew.lastIndexOf(' ');
			return `${trimOveriew.slice(0, lastSpace)}...`
		} return overview
	}

	render() {
		const { overview, poster_path, title, release_date, vote_average, rateChange, id, value, genre_ids } = this.props;
		const date = new Date(release_date);
		const dateArr = String(date).split(' ', 4);
		let trimOveriew;
		let color;
		 if (vote_average <= 3) {
			color = 'card__rating card__rating-red';
		} else if (vote_average <= 5) {
			color = 'card__rating card__rating-orange';
		} else if (vote_average <= 7) {
			color = 'card__rating card__rating-yellow';
		} else color = 'card__rating card__rating-green';
		if (title.length > 20) {
			trimOveriew = this.trimParagraph(overview, 150);
		} else trimOveriew = this.trimParagraph(overview, 200);
		return(
			<Consumer>
			{
				(genre) => {
					const movieGenre = genre.filter(elem => elem.id === genre_ids[0] || elem.id === genre_ids[1] || elem.id === genre_ids[2]);
					const movieGenres = movieGenre.map(elem => {
						return (
							<button className="card__genre">
								{elem.name}
							</button>
						)
					})
					return (
						<div className="card__container">
							<img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className="card__img" alt="Sorry, we didn't find this picture." />
							<div className="card__info">
								<h3 className="card__title">{title}</h3>
								<div className={color}>{vote_average}</div>
								<span className="card__date">{`${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`}</span>
								<div>
									{movieGenres}
								</div>
								<p className="card__paragraph">{trimOveriew}</p>
								<div className="card__rate">
									<Rate allowHalf defaultValue={value} count={10} onChange={value => rateChange(id, value)} allowClear={false} />
								</div>
							</div>
						</div>
					)
				}
			}	
			</Consumer>	
		)
	}
}