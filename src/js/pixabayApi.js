import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

const key = 'key=34376110-cefa88372a41c1ddd5a6e8bb5';

export const searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

export class PixabayAPI {
    page = 1;
    per_page = 40;
    query = '';
    totalHits = 0;
    totalPages = 0;
  
    async getPhotos() {
      const urlAXIOS = `?${key}&q=${this.query}&${searchParams}&page=${
        this.page
      }&per_page=${this.per_page}`;
      const { data } = await axios.get(urlAXIOS);
      return data;
    }
  
    set query(newQuery) {
      this.query = newQuery;
    }
  
    get query() {
      return this.query;
    }
  
    get perPage() {
      return this.per_page;
    }
  
    get page() {
      return this.page;
    }
  
    incrementPage() {
      this.page += 1;
    }
  
    decrementPage() {
      this.page = 1;
    }
  
    set totalHits(hitsValue) {
      this.totalHits = hitsValue;
    }
  
    get totalHits() {
      return this.totalHits;
    }
  
    calculateTotalpages() {
      this.totalPages = Math.ceil(this.totalHits / this.per_page);
    }
  
    get totalPages() {
      return this.totalPages;
    }
  }
