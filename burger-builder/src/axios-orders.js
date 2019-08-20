import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-f7508.firebaseio.com/'
});

export default instance;