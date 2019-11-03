import axios from'axios';

const api = axios.create({
    baseURL: "https://api.nasa.gov/planetary/apod?api_key=7dfNpX7YU51fptt695iUnD33Ls5tk0lLtjXWATa0"
});

export default api;