import React from 'react';
import { Pagination } from 'antd';

import SearchMovie from '../search-movie';
import MovieList from '../movie-list';

import './main.css';

const Main = ({debounce, onSearch, current, onChange, searchValue, searchFilter, pages, movies}) => {
	return(
		<React.Fragment>
			<SearchMovie 
				debounce={debounce}
				onSearch={onSearch}/>

			<MovieList 
				movies={movies} />	

			<Pagination 
				className="main__pagination"
				current={current} 
				onChange={onChange} 
				total={pages} />	

		</React.Fragment>
	)
}

export default Main;