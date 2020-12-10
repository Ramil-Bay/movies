export default class SwapiService {
	apiKey = '67de5e3db303e57d006abae4dac31591';

	apiBase = 'https://api.themoviedb.org/3/';

	guestId = '';

	async guestSession() {
		this.guestId = await this.getSessionId()
		const res = await fetch(`${this.apiBase}guest_session/${this.guestId}/rated/movies?api_key=${this.apiKey}`)
		if (!res.ok) {
			throw new Error(`received ${res.status}`);
		}
		return await res.json();
	}

	async getSessionId() {
		const res = await fetch(`${this.apiBase}authentication/guest_session/new?api_key=${this.apiKey}`)
		if(!res.ok) {
			throw new Error(`received ${res.status}`);
		}
		const value = await res.json()
		return value.guest_session_id
	} 

	async getResource(key, page = null, query = 'return') {
		const res = await fetch(`${this.apiBase}search/movie?api_key=${key}&language=en-US&query=${query}%20&page=${page}`);
		if (!res.ok) {
			throw new Error(`received ${res.status}`);
		}
		return await res.json();
	}

	async getDescription(page, query) {
		const res = await this.getResource(this.apiKey, page, query);
		return await res;
	}

	async postData(id, value) {
		const res = await fetch(`${this.apiBase}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${this.guestId}`, 
		{
			method: 'POST',
	        headers: {
	        	'Content-Type': 'application/json;charset=utf-8',
	        },
	        body: JSON.stringify({
	        	value: value 
	        }),
		});
		if (!res.ok) {
			throw new Error(`received ${res.status}`);
		}
		const data = await res.json();
		return data;
	}

	async getGenre() {
		const res = await fetch(`${this.apiBase}genre/movie/list?api_key=${this.apiKey}`);
		if (!res.ok) {
			throw new Error(`received ${res.status}`);
		}
		const genre = await res.json();
		return genre;
	}
}

