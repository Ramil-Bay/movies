export default class SwapiService {
	async getResource(key, page = null, query = 'return') {
		const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}%20&page=${page}`);
		if (!res.ok) {
			throw new Error(`received ${res.status}`);
		}
		return await res.json();
	}

	async getDescription(page, query) {
		const res = await this.getResource('67de5e3db303e57d006abae4dac31591', page, query);
		return await res;
	}
}
