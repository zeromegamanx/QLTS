//handle việc call API

import axios from 'axios';

export const getPostData = () => {
    return axios.get('https://jsonplaceholder.typicode.com/posts');
}

// Sử dụng một HTTP client dựa trên promise để call API đó là Axios