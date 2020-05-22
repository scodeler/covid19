import axios from 'axios';

const api = axios.create({ baseUrl: 'https://brasil.io/api/dataset/covid19/caso'});

export default api;
