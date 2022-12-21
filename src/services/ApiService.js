import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '30604189-8e45b74ccc7e3af0dfc4ff4c6';

export class ApiService {
  constructor() {
    this.searchQuery = '';
    this.totalHits = '';
    this.page = 1;
    this.perPage = 12;
    this.images = [];
  }

  async fetchPictures() {
    const url = `${API_URL}?key=${API_KEY}`;

    try {
      const response = await axios.get(url, {
        params: {
          q: this.searchQuery,
          page: this.page,
          per_page: this.perPage,
          image_type: 'photo',
          orientation: 'horizontal',
        },
      });
      this.incrementPage();
      this.images = [...response.data.hits];
      return response.data;
    } catch (error) {
      this.decrementPage();
      console.log(error);
    }
  }

  get lastPage() {
    return Math.ceil(this.totalHits / this.perPage);
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
