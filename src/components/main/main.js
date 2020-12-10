import React from 'react';
import { Pagination } from 'antd';

import SearchMovie from '../search-movie';
import MovieList from '../movie-list';

import './main.css';

const Main = ({debounce,
 			onSearch,
 			current, 
 			onChange, 
 			searchValue, 
 			searchFilter, 
 			pages, 
 			movies, 
 			rateChange, 
 			searchMessage, 
 			showEdit, 
 			show, 
 			rateMovies, }) => {

	const renderMovie = show === 'rated' ? rateMovies : movies;

	const searchMovie = show === 'rated' ? null : 
		<SearchMovie 
			debounce={debounce}
			onSearch={onSearch}/>

	const mainRatedClass = show === 'rated' ? 'main__button active' : 'main__button';
	const mainSearchClass = show !== 'rated' ? 'main__button active' : 'main__button';

	const total = show === 'rated' ? 0 : pages

	return(
		<React.Fragment>
			<div className="main__switch">
				<button className={mainSearchClass} 
				onClick={() => showEdit('search')}>Search</button>
			<button className={mainRatedClass}
				onClick={() => showEdit('rated')} >Rated</button>
			</div>
			
			{searchMovie}

			<MovieList 
				movies={renderMovie}
				rateChange={(id, value) => rateChange(id, value)}
				 />	

			{searchMessage}

			<Pagination 
				className="main__pagination"
				current={current} 
				onChange={onChange} 
				total={total} />	

		</React.Fragment>
	)
}

export default Main;