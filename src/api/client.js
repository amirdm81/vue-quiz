import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

const client = axios.create({baseURL});


export default client;