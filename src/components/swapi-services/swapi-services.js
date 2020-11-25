export default class SwapiService {
	async getResource(key, query) {
		const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}`);
		if (!res.ok) {
			throw new Error(`received ${res.status}`);
		}
		return await res.json();
	}

	async getDescription() {
		const res = await this.getResource('67de5e3db303e57d006abae4dac31591', 'return');
		return await res.results;
	}
}
