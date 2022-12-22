import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '30604189-8e45b74ccc7e3af0dfc4ff4c6';

export async function fetchPictures(query, page) {
  const url = `${API_URL}?key=${API_KEY}`;

  try {
    const API_SEARCH_PARAMS = {
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page,
      q: query,
    };

    const response = await axios.get(url, {
      params: API_SEARCH_PARAMS,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
