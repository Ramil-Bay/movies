import React, {Component} from 'react';

import './search-movie.css';

export default class SearchMovie extends Component {
	state = {
		value: '',
	}

	render() {
		const {debounce, onSearch} = this.props
		return (
			<form className="main__form">
				<input 
				type="text" 
				className="main__search" 
				placeholder="Type to search..."
				onChange={debounce(onSearch, 1000)} />
			</form>
		)
	}
}